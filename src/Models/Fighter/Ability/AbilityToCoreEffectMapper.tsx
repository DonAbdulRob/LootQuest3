/**
 * This file maps 'Ability Effects' to 'Core Effects'.
 */

import { EffectLib } from '../../Shared/EffectLib/EffectLIb';

export const ABILITY_ID_POWER_STRIKE = 0;

export function ABILITY_EFFECT_FUNCTION(id: number) {
    switch (id) {
        case ABILITY_ID_POWER_STRIKE:
            return EffectLib.power_strike;
        default:
            return EffectLib.power_strike;
    }
}
