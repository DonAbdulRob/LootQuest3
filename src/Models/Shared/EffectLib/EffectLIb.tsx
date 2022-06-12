/**
 * This file contains all of the 'Core Effect' functions for the game.
 * Core effects are data interactions that are usually triggered by the player making us of an item or ability.
 * However, this may be expanded to encapsulate other effects, like resting at an inn to heal, granting 'blessings' or literally anything else.
 *
 * Note: Don't do percentage increases/decreases for now because we don't have seperate 'buffStatBlock' to uncalculate % buffs yet.
 */
import { __GLOBAL_REFRESH_FUNC_REF } from '../../../Pages/PlayPage';
import {
    CustomDamageMessage,
    handleAttack,
} from '../../../WIndowContent/Combat/Combat';
import { ConsoleData } from '../../../WIndowContent/Console/Console';
import Fighter from '../../Fighter/Fighter';
import { Status } from '../../Fighter/Status';
import CombatState from '../CombatState';
import { activateHealthHealItem } from './EffectLIbHelpers';

export class EffectLib {
    static oran_herb(player: Fighter, index: number, consoleData: ConsoleData) {
        activateHealthHealItem(
            player,
            index,
            consoleData,
            1,
            'You apply the Oran Herb and feel a bit healthier. (+1 Healing).',
        );
    }

    static power_strike(
        player: Fighter,
        enemy: Fighter,
        combatState: CombatState,
        consoleData: ConsoleData,
    ) {
        let cost = 1;
        let damageMod = 2;

        if (player.statBlock.manaMin > cost) {
            player.statBlock.manaMin -= cost;
        } else {
            consoleData.add("You can't afford this ability.");
            __GLOBAL_REFRESH_FUNC_REF();
            return;
        }

        let customDamageMessage: CustomDamageMessage = {
            prefix: 'You activate Power Strike and attack for ',
            suffix: ' damage!',
        };

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

        handleAttack(
            player,
            enemy,
            combatState,
            consoleData,
            customDamageMessage,
        );
    }
}
