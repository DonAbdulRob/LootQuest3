import { getRandomElement } from '../Helper';

export enum ItemType {
    WEAPON,
    CHESTPLATE,
}

export class Item {
    name: string;
    description: string;
    type: ItemType;
    minDamage: number;
    maxDamage: number;
    health: number;
    armor: number = 0;

    constructor(
        name: string,
        description: string,
        type: ItemType,
        minDamage: number,
        maxDamage: number,
        health: number,
        armor: number,
    ) {
        this.name = name;
        this.description = description;
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
        const min = Math.round(Math.random() * 3);
        const max = Math.round(min + Math.random() * 3);
        const mat = getRandomElement(materials);

        return new Item(
            mat + ' Sword',
            'A sword made of ' + mat,
            ItemType.WEAPON,
            min,
            max,
            0,
            0,
        );
    }
}
