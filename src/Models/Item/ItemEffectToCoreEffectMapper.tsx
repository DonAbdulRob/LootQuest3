/**
 * This file maps 'Item Effects' to 'Core Effects'.
 */
import { PlayerItemEffectLib } from '../Shared/EffectLib/PlayerAbilityEffectLib';

export const EFFECT_ID_ORAN_HERB = 0;

export function CONSUMABLE_EFFECT_FUNCTION(id: number) {
    switch (id) {
        case EFFECT_ID_ORAN_HERB:
            return PlayerItemEffectLib.oran_herb;
        default:
            return null;
    }
}
