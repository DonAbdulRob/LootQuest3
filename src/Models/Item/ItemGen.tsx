import { G_getRandomValueUpTo, G_getRandomElement } from '../Helper';
import { Item, Equipment, EquipmentType, Consumable } from './Item';
import * as ItemEffects from './ItemEffectToCoreEffectMapper';

export class ItemGen {
    /**
     * Create a random oak sword with 1-1 to 2-4 damage.
     * @returns
     */
    static getOakSword(): Item {
        const min = G_getRandomValueUpTo(1) + 1;
        const max = Math.round(min + G_getRandomValueUpTo(1) + 1);
        let newItem: Equipment = new Equipment('Oak Sword', 'A sword made of oak.', EquipmentType.WEAPON, 2);
        newItem.statBlock.damageMin = min;
        newItem.statBlock.damageMax = max;
        return newItem;
    }

    static getRandomSword(): Item {
        const materials = ['Wood', 'Stone', 'Iron', 'Gold', 'Diamond'];
        const min = G_getRandomValueUpTo(2) + 1;
        const max = Math.round(min + G_getRandomValueUpTo(2));
        const mat = G_getRandomElement(materials);

        let newItem: Equipment = new Equipment(mat + ' Sword', 'A sword made of ' + mat, EquipmentType.WEAPON, 4);

        newItem.statBlock.damageMin = min;
        newItem.statBlock.damageMax = max;
        return newItem;
    }

    static getOranHerb(): Item {
        let newItem = new Consumable(
            'Oran Herb',
            `A common herb known for its light healing properties. You won't win any fights with it, but outside of combat, it can be a great aid.`,
            0.1,
            ItemEffects.EFFECT_ID_ORAN_HERB,
            2,
        );
        return newItem;
    }
}
