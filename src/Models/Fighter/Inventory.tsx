import { Item, ItemGen, EquipmentType, Equipment } from './Item';

export enum EquipmentSlotMapping {
    weapon = 0,
    chestplate = 1,
}

export class EquipmentSlots {
    items: Array<Equipment | null> = [];

    constructor() {
        this.items = Array(Object.keys(EquipmentSlotMapping).length / 2).fill(
            null,
        );
    }
}

export default class Inventory {
    items: Array<Item | Equipment> = [];

    constructor() {
        let starter1 = new Equipment(
            'Moldy Sword',
            'An old and moldy sword. Is that wood beneath the mold? Or, something else? Who knows...',
            EquipmentType.WEAPON,
        );
        starter1.minDamage = 1;
        starter1.maxDamage = 1;

        let starter2 = new Equipment(
            'Rusty Sword',
            `A rusted sword. Seems a bit better than the moldy sword, but is it really?`,
            EquipmentType.WEAPON,
        );
        starter2.minDamage = 1;
        starter2.maxDamage = 2;

        let starter3 = new Equipment(
            'Paper Chestplate',
            `A chestplate made from discarded nespaper. It might have been useful if crafted into thick layers by a skilled artison. Unfortunately, it wasn't. Pray that it doesn't rain.`,
            EquipmentType.CHESTPLATE,
        );
        starter3.health = 3;

        let starter4 = new Equipment(
            'Cardboard Chestplate',
            `A chestplate made from torn cardboard boxes. Does offer 'some' protection, but makes you uncomfortable, stiff and a bit itchy. You also smell... urine?`,
            EquipmentType.CHESTPLATE,
        );
        starter4.armor = 1;

        this.items.push(
            starter1,
            starter2,
            starter3,
            starter4,
            ItemGen.getOranHerb(),
        );
    }
}
