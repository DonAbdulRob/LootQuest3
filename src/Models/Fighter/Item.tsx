import { getRandomElement, getRandomValueUpTo } from '../Helper';
import * as ItemEffects from './ItemEffects';

export enum ItemType {
    EQUIPMENT,
    CONSUMABLE,
}

export enum EquipmentType {
    WEAPON,
    CHESTPLATE,
}

export class Item {
    name: string = '';
    description: string = '';
    itemType: ItemType = 0;

    constructor(name: string, description: string, itemType: ItemType) {
        this.name = name;
        this.description = description;
        this.itemType = itemType;
    }

    static getFromJSON(obj: any): any {
        let i: any;

        if (obj.itemType === ItemType.EQUIPMENT) {
            i = new Equipment(obj.name, obj.description, obj.itemType);
            i.equipmentType = obj.equipmentType;
            i.minDamage = obj.minDamage;
            i.maxDamage = obj.maxDamage;
            i.health = obj.health;
            i.armor = obj.armor;
        } else if (obj.itemType === ItemType.CONSUMABLE) {
            i = new Consumable(
                obj.name,
                obj.description,
                obj.useFunctionId,
                obj.useCount,
            );
        } else {
            i = new Item(obj.name, obj.description, obj.itemType);
        }

        return i;
    }
}

export class Equipment extends Item {
    equipmentType: EquipmentType = 0;
    minDamage: number = 0;
    maxDamage: number = 0;
    health: number = 0;
    armor: number = 0;

    constructor(
        name: string,
        description: string,
        equipmentType: EquipmentType,
    ) {
        super(name, description, ItemType.EQUIPMENT);
        this.equipmentType = equipmentType;
    }
}

export class Consumable extends Item {
    useFunctionId: number;
    useCount: number = 0;

    constructor(
        name: string,
        description: string,
        useFunctionId: number,
        useCount: number,
    ) {
        super(name, description, ItemType.CONSUMABLE);
        this.useFunctionId = useFunctionId;
        this.useCount = useCount;
    }
}

export class ItemGen {
    static getRandomSword(): Item {
        const materials = ['Wood', 'Stone', 'Iron', 'Gold', 'Diamond'];
        const min = getRandomValueUpTo(2) + 1;
        const max = Math.round(min + getRandomValueUpTo(2));
        const mat = getRandomElement(materials);

        let newItem: Equipment = new Equipment(
            mat + ' Sword',
            'A sword made of ' + mat,
            EquipmentType.WEAPON,
        );

        newItem.minDamage = min;
        newItem.maxDamage = max;
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
