export class Item {
    name: string = "";
    minDamage: number = 0;
    maxDamage: number = 0;
    minHealth: number = 0;
    maxHealth: number = 0;

    constructor(name: string, minDamage: number, maxDamage: number, minHealth: number, maxHealth: number) {
        this.name = name;
        this.minDamage = minDamage;
        this.maxDamage = maxDamage;
        this.minHealth = minHealth;
        this.maxHealth = maxHealth;
    }
}

export class Equipment {
    sword: Item | null = null;
    armor: Item | null = null;
}

export default class Inventory {
    items: Array<Item> = [new Item("Wood Sword", 1, 1, 0, 0)];
}
