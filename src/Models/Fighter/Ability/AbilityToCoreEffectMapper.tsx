/**
 * This file maps 'Ability Effects' to 'Core Effects'.
 */

import { PlayerAbilityEffectLib } from '../../Shared/EffectLib/PlayerAbilityEffectLib';

export const ABILITY_ID_POWER_STRIKE = 0;
export const ABILITY_ID_LESSER_HEAL = 1;

export function ABILITY_EFFECT_FUNCTION(id: number) {
    switch (id) {
        case ABILITY_ID_POWER_STRIKE:
            return PlayerAbilityEffectLib.power_strike;
        case ABILITY_ID_LESSER_HEAL:
            return PlayerAbilityEffectLib.lesser_heal;
        default:
            return PlayerAbilityEffectLib.power_strike;
    }
}
