export enum ItemType {
    WEAPON, CHESTPLATE
}

export class Item {
    name: string;
    type: ItemType;
    minDamage: number;
    maxDamage: number;
    health: number;

    constructor(name: string, type: ItemType, minDamage: number, maxDamage: number, health: number) {
        this.name = name;
        this.type = type;
        this.minDamage = minDamage;
        this.maxDamage = maxDamage;
        this.health = health;
    }
}

export enum EquipmentSlotMapping {
    weapon = 0,
    chestplate = 1
}

export class Equipment {
    items: Array<Item | null> = [];

    constructor() {
        this.items = Array(Object.keys(EquipmentSlotMapping).length / 2).fill(null);
    }
}

export default class Inventory {
    items: Array<Item>;

    constructor() {
        this.items = [
            new Item("Wood Sword", ItemType.WEAPON, 10, 10, 0),
            new Item("Stone Sword", ItemType.WEAPON, 10, 10, 0),
            new Item("Bark Chestplate", ItemType.CHESTPLATE, 0, 0, 20)
        ];
    }
}
