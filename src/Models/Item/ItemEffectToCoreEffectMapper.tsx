/**
 * This file maps 'Item Effects' to 'Core Effects'.
 */
import { EffectLib } from '../Shared/EffectLib/EffectLIb';

export const EFFECT_ID_ORAN_HERB = 0;

export function CONSUMABLE_EFFECT_FUNCTION(id: number) {
    switch (id) {
        case EFFECT_ID_ORAN_HERB:
            return EffectLib.oran_herb;
        default:
            return null;
    }
}
