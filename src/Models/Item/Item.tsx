/**
 * This file contains the base definition for items.
 * Items are objects that the player can own that have any number of uses.
 * Equipment, consumables and quest items (future) will all be items.
 */
export enum ItemType {
    EQUIPMENT,
    CONSUMABLE,
    RESOURCE,
}

export enum EquipmentType {
    WEAPON,
    CHESTPLATE,
}

export class Item {
    name: string = '';
    description: string = '';
    itemType: ItemType = 0;
    weight: number = 0;
    level: number;

    constructor(name: string, description: string, itemType: ItemType, weight: number, level: number) {
        this.name = name;
        this.description = description;
        this.itemType = itemType;
        this.weight = weight;
        this.level = level;
    }

    static getFromJSON(obj: any): any {
        let i: any;

        if (obj.itemType === ItemType.EQUIPMENT) {
            i = new Equipment(obj.name, obj.description, obj.equipmentType, obj.weight, obj.level);
            i.minDamage = obj.minDamage;
            i.maxDamage = obj.maxDamage;
            i.health = obj.health;
            i.armor = obj.armor;
        } else if (obj.itemType === ItemType.CONSUMABLE) {
            i = new Consumable(obj.name, obj.description, obj.weight, obj.useFunctionId, obj.useCount, obj.level);
        } else {
            i = new Item(obj.name, obj.description, obj.itemType, obj.weight, obj.level);
        }

        return i;
    }
}

export interface IEquipmentStatBlock {
    health: number;
    stamina: number;
    mana: number;
    damageMin: number;
    damageMax: number;
    armor: number;
}

export class Equipment extends Item {
    equipmentType: EquipmentType = EquipmentType.WEAPON;
    statBlock: IEquipmentStatBlock = {
        health: 0,
        stamina: 0,
        mana: 0,
        damageMin: 0,
        damageMax: 0,
        armor: 0,
    };

    constructor(name: string, description: string, weight: number, level: number, equipmentType: EquipmentType) {
        super(name, description, ItemType.EQUIPMENT, weight, level);
        this.equipmentType = equipmentType;
    }
}

export class Consumable extends Item {
    useFunctionId: number;
    useCount: number = 0;

    constructor(
        name: string,
        description: string,
        weight: number,
        level: number,
        useFunctionId: number,
        useCount: number,
    ) {
        super(name, description, ItemType.CONSUMABLE, weight, level);
        this.useFunctionId = useFunctionId;
        this.useCount = useCount;
    }
}

export class Resource extends Item {
    constructor(name: string, description: string, weight: number, level: number) {
        super(name, description, ItemType.RESOURCE, weight, level);
    }
}
