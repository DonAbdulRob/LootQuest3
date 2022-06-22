/**
 * This file maps 'Item Effects' to 'Core Effects'.
 */
import { PlayerItemEffectLib } from '../Shared/EffectLib/PlayerAbilityEffectLib';

let effect_counter = 0;

export const EFFECT_ID_ORAN_HERB = effect_counter++;
export const EFFECT_ID_RYLA_HERB = effect_counter++;
export const EFFECT_ID_MORO_HERB = effect_counter++;
export const EFFECT_ID_TAL_HERB = effect_counter++;

export function CONSUMABLE_EFFECT_FUNCTION(id: number) {
    switch (id) {
        case EFFECT_ID_ORAN_HERB:
            return PlayerItemEffectLib.oran_herb;
        case EFFECT_ID_RYLA_HERB:
            return PlayerItemEffectLib.ryla_herb;
        case EFFECT_ID_MORO_HERB:
            return PlayerItemEffectLib.moro_herb;
        case EFFECT_ID_TAL_HERB:
            return PlayerItemEffectLib.tal_herb;
        default:
            return null;
    }
}
