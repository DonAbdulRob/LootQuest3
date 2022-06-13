import { getRandomValueUpTo, getRandomElement } from '../Helper';
import { Item, Equipment, EquipmentType, Consumable } from './Item';
import * as ItemEffects from './ItemEffectToCoreEffectMapper';

export class ItemGen {
    static getRandomSword(): Item {
        const materials = ['Wood', 'Stone', 'Iron', 'Gold', 'Diamond'];
        const min = getRandomValueUpTo(2) + 1;
        const max = Math.round(min + getRandomValueUpTo(2));
        const mat = getRandomElement(materials);

        let newItem: Equipment = new Equipment(mat + ' Sword', 'A sword made of ' + mat, EquipmentType.WEAPON);

        newItem.statBlock.damageMin = min;
        newItem.statBlock.damageMax = max;
        return newItem;
    }
    static getOranHerb(): Item {
        let newItem = new Consumable(
            'Oran Herb',
            `A common herb known for its light healing properties. You won't win any fights with it, but outside of combat, it can be a great aid.`,
            ItemEffects.EFFECT_ID_ORAN_HERB,
            1,
        );
        return newItem;
    }
}
