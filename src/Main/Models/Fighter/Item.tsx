import { getRandomElement } from '../Helper';

export enum ItemType {
    WEAPON,
    CHESTPLATE,
}

export class Item {
    name: string;
    type: ItemType;
    minDamage: number;
    maxDamage: number;
    health: number;
    armor: number = 0;

    constructor(
        name: string,
        type: ItemType,
        minDamage: number,
        maxDamage: number,
        health: number,
        armor: number,
    ) {
        this.name = name;
        this.type = type;
        this.minDamage = minDamage;
        this.maxDamage = maxDamage;
        this.health = health;
        this.armor = armor;
    }
}

export class ItemGen {
    static getRandomSword(): Item {
        const materials = ['Wood', 'Stone', 'Iron', 'Gold', 'Diamond'];
        const min = Math.random() * 3;
        const max = min + Math.random() * 3;
        return new Item(
            getRandomElement(materials) + ' Sword',
            ItemType.WEAPON,
            min,
            max,
            0,
            0,
        );
    }
}
