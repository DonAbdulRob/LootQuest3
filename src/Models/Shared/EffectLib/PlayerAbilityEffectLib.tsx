/**
 * This file contains all of the 'Core Effect' functions for the game.
 * Core effects are data interactions that are usually triggered by the player making us of an item or ability.
 * However, this may be expanded to encapsulate other effects, like resting at an inn to heal, granting 'blessings' or literally anything else.
 *
 * Note: Don't do percentage increases/decreases for now because we don't have seperate 'buffStatBlock' to uncalculate % buffs yet.
 */
import { __GLOBAL_REFRESH_FUNC_REF } from '../../../App';
import { RpgConsole } from '../../Singles/RpgConsole';
import { Player } from '../../Fighter/Player';
import Fighter from '../../Fighter/Fighter';
import { G_HIDDEN_SKIP_TURN_STATUS, Status } from '../../Fighter/Status/Status';
import { activateHealthHealItem } from './EffectLIbHelpers';
import { G_getRandomValueUpTo } from '../../Helper';
import { IRootStore } from '../../GlobalGameStore';

const STR_COMBAT_ONLY = 'This ability can only be used in combat.';
const STR_NOT_ENOUGH_RESOURCE = `You can't afford to use this ability.`;

export interface IPlayerItemEffectFunction {
    (store: IRootStore, index: number): void;
}

export interface IAbilityEffectFunction {
    (store: IRootStore): void;
}

export interface INonCombatAction {
    (store: IRootStore, message: string): void;
}

function canCast_CombatOnlyCheck(store: IRootStore, staminaCost: number, manaCost: number): boolean {
    // Prevent use of ability outside of combat.
    if (!store.player.isFighting()) {
        store.rpgConsole.add(STR_COMBAT_ONLY);
        __GLOBAL_REFRESH_FUNC_REF();
        return false;
    }

    // Check other conditions.
    return canCast_AnywhereCheck(store.player, staminaCost, manaCost, store.rpgConsole);
}

/**
 * Is used to check required fields to be able to use abilities.
 * For instance, ability cost and, for the future, status checks (like silence).
 */
function canCast_AnywhereCheck(player: Player, staminaCost: number, manaCost: number, rpgConsole: RpgConsole): boolean {
    // Make sure player can pay skill cost.
    let canAfford = player.statBlock.staminaMin >= staminaCost && player.statBlock.manaMin >= manaCost;

    if (canAfford) {
        player.statBlock.staminaMin -= staminaCost;
        player.statBlock.manaMin -= manaCost;
    } else {
        rpgConsole.add(STR_NOT_ENOUGH_RESOURCE);
        __GLOBAL_REFRESH_FUNC_REF();
        return false;
    }

    return true;
}

// Core effects can be used by either players or monsters.
export class CoreEffects {
    static oran_herb = (user: Fighter, index: number, rpgConsole: RpgConsole) => {
        activateHealthHealItem(
            user,
            index,
            rpgConsole,
            1,
            'You apply the Oran Herb and feel a bit healthier. (+1 Healing).',
        );
    };
}

// Items can be used by players or monsters (WIP). This is for players.
export class PlayerItemEffectLib {
    static oran_herb: IPlayerItemEffectFunction = (store: IRootStore, index: number) => {
        let player = store.player;

        // Handle oran herb core effect.
        CoreEffects.oran_herb(player, index, store.rpgConsole);

        // If fighting, add skip turn status and handle combat round.
        if (player.isFighting()) {
            PlayerAbilityEffectLib.addSkipTurnStatusToPlayer(player);
            store.combatState.processCombatRound(store);
        }
    };
}

export class PlayerAbilityEffectLib {
    static addSkipTurnStatusToPlayer = (player: Player) => {
        player.statusContainer.addStatus(new Status(G_HIDDEN_SKIP_TURN_STATUS, 1, null, null, false));
    };

    static doNonCombatAction: INonCombatAction = (store: IRootStore, actionMessage: string) => {
        // Give player skip_turn status.
        PlayerAbilityEffectLib.addSkipTurnStatusToPlayer(store.player);

        // Process combat round.
        store.combatState.processCombatRound(store, {
            insertDamage: false,
            str1: actionMessage,
        });
    };

    static flee: IAbilityEffectFunction = (store: IRootStore) => {
        // Attempt to flee. On success, return, else, continue combat. (25%)
        let fleeRes = G_getRandomValueUpTo(3);

        if (fleeRes === 0) {
            store.rpgConsole.add('You successfully flee from combat.');
            store.player.setCombatOver();
            __GLOBAL_REFRESH_FUNC_REF();
            return;
        }

        // Give player skip_turn status.
        PlayerAbilityEffectLib.addSkipTurnStatusToPlayer(store.player);

        // Process combat round.
        store.combatState.processCombatRound(store, {
            insertDamage: false,
            str1: 'Your attempt to flee fails.',
        });
    };

    static defend: IAbilityEffectFunction = (store: IRootStore) => {
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
        store.combatState.processCombatRound(store, {
            insertDamage: false,
            str1: 'You take a defensive stance and gain +2 armor for the round.',
        });
    };

    static equip: IAbilityEffectFunction = (store: IRootStore) => {
        let player = store.player;

        if (player.isFighting()) {
            // Add skip turn status.
            PlayerAbilityEffectLib.addSkipTurnStatusToPlayer(player);

            // Perform an attack with a custom damage message format.
            store.combatState.processCombatRound(store, {
                insertDamage: false,
                str1: 'You spend some time switching your equipment.',
            });
        }
    };

    static drop: IAbilityEffectFunction = (store: IRootStore) => {
        let player = store.player;

        if (player.isFighting()) {
            // Add skip turn status.
            PlayerAbilityEffectLib.addSkipTurnStatusToPlayer(player);

            // Perform an attack with a custom damage message format.
            store.combatState.processCombatRound(store, {
                insertDamage: false,
                str1: 'You spend some time dropping an item.',
            });
        }
    };

    static power_strike: IAbilityEffectFunction = (store: IRootStore) => {
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
        store.combatState.processCombatRound(store, {
            insertDamage: true,
            str1: 'You activate Power Strike and attack for ',
            str2: ' damage!',
        });
    };

    static lesser_heal: IAbilityEffectFunction = (store: IRootStore) => {
        let player = store.player;
        let rpgConsole = store.rpgConsole;

        // Check that player can cast via standard check function.
        if (!canCast_AnywhereCheck(player, 0, 5, rpgConsole)) {
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
            store.combatState.processCombatRound(store, {
                insertDamage: false,
                str1: str,
            });
        } else {
            rpgConsole.add(str);
            __GLOBAL_REFRESH_FUNC_REF();
        }
    };
}
