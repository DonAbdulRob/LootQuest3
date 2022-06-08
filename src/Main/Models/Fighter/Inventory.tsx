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
            new Item('Wood Sword', ItemType.WEAPON, 10, 10, 0, 0),
            new Item('Stone Sword', ItemType.WEAPON, 10, 10, 0, 0),
            new Item('Bark Chestplate', ItemType.CHESTPLATE, 0, 0, 20, 1),
        ];
    }
}
