import { Consumable } from '../Item';
import ItemGroup from '../Shared/ItemGroup';
import * as ItemEffects from '../ItemEffectToCoreEffectMapper';

export class IG_Herb extends ItemGroup {
    static suffix: string = ' Herb';

    static oran = () => {
        return new Consumable(
            'Oran' + IG_Herb.suffix,
            `A common green, leaf-shaped herb known for its light healing properties. You won't win any fights with it, but outside of combat, it can be a great aid.`,
            0.1,
            1,
            ItemEffects.EFFECT_ID_ORAN_HERB,
            1,
        );
    };

    static ryla = () => {
        return new Consumable(
            'Ryla' + IG_Herb.suffix,
            `A leaf-shaped herb known for its decent healing properties.`,
            0.2,
            3,
            ItemEffects.EFFECT_ID_RYLA_HERB,
            1,
        );
    };

    static moro = () => {
        return new Consumable(
            'Moro' + IG_Herb.suffix,
            `A cube-shaped herb with dark-blue veins known to be very useful for healing wounds and cuts.`,
            0.3,
            5,
            ItemEffects.EFFECT_ID_MORO_HERB,
            1,
        );
    };

    static tal = () => {
        return new Consumable(
            'Tal' + IG_Herb.suffix,
            `A rare tan-colored herb that has two leaves per stem. Each leaf has substantial healing propertiess.`,
            1.2,
            5,
            ItemEffects.EFFECT_ID_TAL_HERB,
            2,
        );
    };

    /**
     *   Aggregate consumables.
     * 
    static getOranHerbBundle: () => Consumable = (): Consumable => {
        return new Consumable(
            'Oran' + IG_Herb.suffix,
            `A bundle of five Oran Herbs that can be used multiple times.`,
            0.1,
            5,
            ItemEffects.EFFECT_ID_ORAN_HERB,
            5,
        );
    };
     */

    constructor() {
        super([IG_Herb.oran(), IG_Herb.moro(), IG_Herb.tal()]);
    }
}
