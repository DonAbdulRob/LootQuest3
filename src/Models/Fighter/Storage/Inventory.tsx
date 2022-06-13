/**
 * An Inventory is a collection of items.
 */
import { Item, EquipmentType, Equipment } from '../../Item/Item';
import { ItemGen } from '../../Item/ItemGen';

export default class Inventory {
    items: Array<Item | Equipment> = [];

    constructor() {
        let starter1 = new Equipment(
            'Moldy Sword',
            'An old and moldy sword. Is that wood beneath the mold? Or, something else? Who knows...',
            EquipmentType.WEAPON,
        );
        starter1.statBlock.damageMin = 1;
        starter1.statBlock.damageMax = 1;

        let starter2 = new Equipment(
            'Rusty Sword',
            `A rusted sword. Seems a bit better than the moldy sword, but is it really?`,
            EquipmentType.WEAPON,
        );
        starter2.statBlock.damageMin = 1;
        starter2.statBlock.damageMax = 2;

        let starter3 = new Equipment(
            'Paper Chestplate',
            `A chestplate made from discarded nespaper. It might have been useful if crafted into thick layers by a skilled artison. Unfortunately, it wasn't. Pray that it doesn't rain.`,
            EquipmentType.CHESTPLATE,
        );
        starter3.statBlock.health = 3;

        let starter4 = new Equipment(
            'Cardboard Chestplate',
            `A chestplate made from torn cardboard boxes. Does offer 'some' protection, but makes you uncomfortable, stiff and a bit itchy. You also smell... urine?`,
            EquipmentType.CHESTPLATE,
        );
        starter4.statBlock.armor = 1;

        this.items.push(starter1, starter2, starter3, starter4, ItemGen.getOranHerb());
    }

    clear() {
        this.items = [];
    }
}
