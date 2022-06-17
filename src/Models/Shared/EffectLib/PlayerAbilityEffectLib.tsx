/**
 * This file contains all of the 'Core Effect' functions for the game.
 * Core effects are data interactions that are usually triggered by the player making us of an item or ability.
 * However, this may be expanded to encapsulate other effects, like resting at an inn to heal, granting 'blessings' or literally anything else.
 *
 * Note: Don't do percentage increases/decreases for now because we don't have seperate 'buffStatBlock' to uncalculate % buffs yet.
 */
import { __GLOBAL_REFRESH_FUNC_REF } from '../../../Pages/PlayPage';
import { processCombatRound } from '../../../WIndowContent/EmbeddedWindow/Combat/CombatComponent';
import { ConsoleData } from '../../../WIndowContent/Console/ConsoleComponent';
import { Fighter } from '../../Fighter/Fighter';
import { Player } from '../../Fighter/Player';
import { G_HIDDEN_SKIP_TURN_STATUS, Status } from '../../Fighter/Status/Status';
import { activateHealthHealItem } from './EffectLIbHelpers';
import { getRandomValueUpTo } from '../../Helper';
import { GlobalGameStore } from '../../GlobalGameStore';

const STR_COMBAT_ONLY = 'This ability can only be used in combat.';
const STR_NOT_ENOUGH_RESOURCE = `You can't afford to use this ability.`;

export interface PlayerItemEffectFunctionTemplate {
    (store: GlobalGameStore, index: number): void;
}

export interface AbilityEffectFunctionTemplate {
    (store: GlobalGameStore): void;
}

export interface NonCombatActionTemplate {
    (store: GlobalGameStore, message: string): void;
}

function canCast_CombatOnlyCheck(store: GlobalGameStore, staminaCost: number, manaCost: number): boolean {
    // Prevent use of ability outside of combat.
    if (!store.player.isFighting()) {
        store.consoleData.add(STR_COMBAT_ONLY);
        __GLOBAL_REFRESH_FUNC_REF();
        return false;
    }

    // Check other conditions.
    return canCast_AnywhereCheck(store.player, staminaCost, manaCost, store.consoleData);
}

/**
 * Is used to check required fields to be able to use abilities.
 * For instance, ability cost and, for the future, status checks (like silence).
 */
function canCast_AnywhereCheck(
    player: Player,
    staminaCost: number,
    manaCost: number,
    consoleData: ConsoleData,
): boolean {
    // Make sure player can pay skill cost.
    let canAfford = player.statBlock.staminaMin >= staminaCost && player.statBlock.manaMin >= manaCost;

    if (canAfford) {
        player.statBlock.staminaMin -= staminaCost;
        player.statBlock.manaMin -= manaCost;
    } else {
        consoleData.add(STR_NOT_ENOUGH_RESOURCE);
        __GLOBAL_REFRESH_FUNC_REF();
        return false;
    }

    return true;
}

// Core effects can be used by either players or monsters.
export class CoreEffects {
    static oran_herb = (user: Fighter, index: number, consoleData: ConsoleData) => {
        activateHealthHealItem(
            user,
            index,
            consoleData,
            1,
            'You apply the Oran Herb and feel a bit healthier. (+1 Healing).',
        );
    };
}

// Items can be used by players or monsters (WIP). This is for players.
export class PlayerItemEffectLib {
    static oran_herb: PlayerItemEffectFunctionTemplate = (store: GlobalGameStore, index: number) => {
        // Handle oran herb core effect.
        CoreEffects.oran_herb(store.player, index, store.consoleData);

        // Todo, if in combat, add skip turn status and continue combat.
    };
}

export class PlayerAbilityEffectLib {
    static addSkipTurnStatusToPlayer = (player: Player) => {
        player.statusContainer.addStatus(new Status(G_HIDDEN_SKIP_TURN_STATUS, 1, null, null, false));
    };

    static doNonCombatAction: NonCombatActionTemplate = (store: GlobalGameStore, actionMessage: string) => {
        // Give player skip_turn status.
        PlayerAbilityEffectLib.addSkipTurnStatusToPlayer(store.player);

        // Process combat round.
        processCombatRound(store, {
            insertDamage: false,
            str1: actionMessage,
        });
    };

    static flee: AbilityEffectFunctionTemplate = (store: GlobalGameStore) => {
        // Attempt to flee. On success, return, else, continue combat. (25%)
        let fleeRes = getRandomValueUpTo(3);

        if (fleeRes === 0) {
            store.consoleData.add('You successfully flee from combat.');
            store.player.setCombatOver();
            __GLOBAL_REFRESH_FUNC_REF();
            return;
        }

        // Give player skip_turn status.
        PlayerAbilityEffectLib.addSkipTurnStatusToPlayer(store.player);

        // Process combat round.
        processCombatRound(store, {
            insertDamage: false,
            str1: 'Your attempt to flee fails.',
        });
    };

    static defend: AbilityEffectFunctionTemplate = (store: GlobalGameStore) => {
        // Player can always defend.
        let player = store.player;

        // Add defense buff status to player.
        let armorMod = 2;

        player.statusContainer.addStatus(
            new Status(
                'Defend',
                1,
                () => {
                    player.statBlock.armor += armorMod;
                },
                () => {
                    player.statBlock.armor -= armorMod;
                },
                true,
            ),
        );

        // Add skip turn status.
        PlayerAbilityEffectLib.addSkipTurnStatusToPlayer(player);

        // Perform an attack with a custom damage message format.
        processCombatRound(store, {
            insertDamage: false,
            str1: 'You take a defensive stance and gain +2 armor for the round.',
        });
    };

    static power_strike: AbilityEffectFunctionTemplate = (store: GlobalGameStore) => {
        let player = store.player;

        // Check that player can cast via standard check function.
        if (!canCast_CombatOnlyCheck(store, 1, 0)) {
            return;
        }

        // Add damage buff status to player.
        let damageMod = 2;

        player.statusContainer.addStatus(
            new Status(
                'Power Strike',
                1,
                () => {
                    player.statBlock.damageMin += damageMod;
                    player.statBlock.damageMax += damageMod;
                },
                () => {
                    player.statBlock.damageMin -= damageMod;
                    player.statBlock.damageMax -= damageMod;
                },
                true,
            ),
        );

        // Perform an attack with a custom damage message format.
        processCombatRound(store, {
            insertDamage: true,
            str1: 'You activate Power Strike and attack for ',
            str2: ' damage!',
        });
    };

    static lesser_heal: AbilityEffectFunctionTemplate = (store: GlobalGameStore) => {
        let player = store.player;
        let consoleData = store.consoleData;

        // Check that player can cast via standard check function.
        if (!canCast_AnywhereCheck(player, 0, 5, consoleData)) {
            return;
        }

        // Message str..
        let str = 'You cast Lesser Heal. (+1 Health)';

        // Heal player.
        player.healHealth(1);

        // Add skip turn status to player.
        PlayerAbilityEffectLib.addSkipTurnStatusToPlayer(player);

        // If in combat, perfrom a combat turn.
        if (player.isFighting()) {
            processCombatRound(store, {
                insertDamage: false,
                str1: str,
            });
        } else {
            consoleData.add(str);
            __GLOBAL_REFRESH_FUNC_REF();
        }
    };
}
