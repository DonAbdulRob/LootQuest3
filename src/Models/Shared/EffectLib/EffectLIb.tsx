/**
 * This file contains all of the 'Core Effect' functions for the game.
 * Core effects are data interactions that are usually triggered by the player making us of an item or ability.
 * However, this may be expanded to encapsulate other effects, like resting at an inn to heal, granting 'blessings' or literally anything else.
 *
 * Note: Don't do percentage increases/decreases for now because we don't have seperate 'buffStatBlock' to uncalculate % buffs yet.
 */
import { __GLOBAL_REFRESH_FUNC_REF } from '../../../Pages/PlayPage';
import { processCombatRound } from '../../../WIndowContent/Combat/Combat';
import { ConsoleData } from '../../../WIndowContent/Console/Console';
import { Player, Monster, Fighter } from '../../Fighter/Fighter';
import { G_HIDDEN_SKIP_TURN_STATUS, Status } from '../../Fighter/Status';
import CombatState from '../CombatState';
import { activateHealthHealItem } from './EffectLIbHelpers';

const STR_COMBAT_ONLY = 'This ability can only be used in combat.';
const STR_NOT_ENOUGH_RESOURCE = `You can't afford to use this ability.`;

export interface PlayerItemEffectFunctionTemplate {
    (player: Player, enemy: Monster, index: number, combatState: CombatState, consoleData: ConsoleData): void;
}

export interface AbilityEffectFunctionTemplate {
    (player: Player, enemy: Monster, combatState: CombatState, consoleData: ConsoleData): void;
}

function canCast_CombatOnlyCheck(
    player: Player,
    staminaCost: number,
    manaCost: number,
    combatState: CombatState,
    consoleData: ConsoleData,
): boolean {
    // Prevent use of ability outside of combat.
    if (!combatState.inCombat()) {
        consoleData.add(STR_COMBAT_ONLY);
        __GLOBAL_REFRESH_FUNC_REF();
        return false;
    }

    // Check other conditions.
    return canCast_AnywhereCheck(player, manaCost, staminaCost, consoleData);
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
    static oran_herb: PlayerItemEffectFunctionTemplate = (
        itemUser: Player,
        enemy: Monster,
        index: number,
        combatState: CombatState,
        consoleData: ConsoleData,
    ) => {
        // Handle oran herb core effect.
        CoreEffects.oran_herb(itemUser, index, consoleData);

        // Todo, if in combat, add skip turn status and continue combat.
    };
}

export class PlayerAbilityEffectLib {
    static power_strike: AbilityEffectFunctionTemplate = (
        player: Player,
        enemy: Monster,
        combatState: CombatState,
        consoleData: ConsoleData,
    ) => {
        // Check that player can cast via standard check function.
        if (!canCast_CombatOnlyCheck(player, 1, 0, combatState, consoleData)) {
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
        processCombatRound(player, enemy, combatState, consoleData, {
            prefix: 'You activate Power Strike and attack for ',
            suffix: ' damage!',
        });
    };

    static lesser_heal: AbilityEffectFunctionTemplate = (
        player: Player,
        enemy: Monster,
        combatState: CombatState,
        consoleData: ConsoleData,
    ) => {
        // Check that player can cast via standard check function.
        if (!canCast_AnywhereCheck(player, 0, 5, consoleData)) {
            return;
        }

        // Heal player.
        player.healHealth(1);

        // Messaging.
        consoleData.add('You cast Lesser Heal. (+1 Health)');

        // Add skip turn status to player.
        player.statusContainer.addStatus(new Status(G_HIDDEN_SKIP_TURN_STATUS, 1, null, null, false));

        // If in combat, perfrom a combat turn.
        if (combatState.inCombat()) {
            processCombatRound(player, enemy, combatState, consoleData);
        } else {
            __GLOBAL_REFRESH_FUNC_REF();
        }
    };
}
