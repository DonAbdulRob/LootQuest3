import { Item, ItemType } from './Item';

export enum EquipmentSlotMapping {
    weapon = 0,
    chestplate = 1,
}

export class Equipment {
    items: Array<Item | null> = [];

    constructor() {
        this.items = Array(Object.keys(EquipmentSlotMapping).length / 2).fill(
            null,
        );
    }
}

export default class Inventory {
    items: Array<Item>;

    constructor() {
        this.items = [
            new Item(
                'Moldy Sword',
                `An old and moldy sword. Is that wood beneath the mold? Or, something else? Who knows...`,
                ItemType.WEAPON,
                1,
                1,
                0,
                0,
            ),
            new Item(
                'Rusty Sword',
                `A rusted sword. Seems a bit better than the moldy sword, but is it really?`,
                ItemType.WEAPON,
                1,
                2,
                0,
                0,
            ),
            new Item(
                'Paper Chestplate',
                `A chestplate made from discarded nespaper. It might have been useful if crafted into thick layers by a skilled artison. Unfortunately, it wasn't. Pray that it doesn't rain.`,
                ItemType.CHESTPLATE,
                0,
                0,
                3,
                0,
            ),
            new Item(
                'Cardboard Chestplate',
                `A chestplate made from torn cardboard boxes. Does offer 'some' protection, but makes you uncomfortable, stiff and a bit itchy. You also smell... urine?`,
                ItemType.CHESTPLATE,
                0,
                0,
                1,
                1,
            ),
        ];
    }
}
