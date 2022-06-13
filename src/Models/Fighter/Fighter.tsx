/**
 * A fighter represents players and monsters that battle each other.
 * Also, if it is ever decided to make inanimate objects into battle-able entities, this would be used too...
 */
import { getRandomValueBetween } from '../Helper';
import { StatBlock } from '../Shared/StatBlock';
import Inventory from './Storage/Inventory';
import { Equipment, Item } from '../Item/Item';
import { EquipmentSlots } from './Storage/EquipmentSlots';
import { StatusContainer } from './Status/StatusContainer';

export class Fighter {
    name: string = '';
    level: number = 0;
    experience: number = 0;
    gold: number = 0;

    statBlock: StatBlock = {
        healthMin: 0,
        healthMax: 0,
        staminaMin: 0,
        staminaMax: 0,
        manaMin: 0,
        manaMax: 0,
        damageMin: 0,
        damageMax: 0,
        armor: 0,
    };

    inventory: Inventory = new Inventory();
    equipmentSlots: EquipmentSlots = new EquipmentSlots();
    statusContainer: StatusContainer = new StatusContainer();

    /** Reset all properties EXCEPT the 'isPlayer' property. Should be updated as new properties are added. */
    reset() {
        this.name = '';
        this.level = 0;
        this.experience = 0;
        this.gold = 0;
        this.statBlock.healthMin = 0;
        this.statBlock.healthMax = 0;
        this.statBlock.staminaMin = 0;
        this.statBlock.staminaMax = 0;
        this.statBlock.manaMin = 0;
        this.statBlock.manaMax = 0;
        this.statBlock.damageMin = 0;
        this.statBlock.damageMax = 0;
        this.statBlock.armor = 0;
        this.inventory.clear();
        this.equipmentSlots.clear();
        this.statusContainer.clear();
    }

    /** Methods to convert properties to and from JSON. Should be updated as new properties are added. */
    getJSON() {
        return JSON.stringify(this);
    }

    // Protected level method.
    fromJSON(str: string) {
        let obj = JSON.parse(str);
        let item1;
        let ele;

        this.name = obj.name;
        this.level = obj.level;
        this.experience = obj.experience;
        this.gold = obj.gold;
        this.statBlock = obj.statBlock;

        this.inventory.items = [];

        for (item1 of obj.inventory.items) {
            this.inventory.items.push(Item.getFromJSON(item1));
        }

        this.equipmentSlots.items = [];

        for (var i = 0; i < obj.equipmentSlots.items.length; i++) {
            ele = obj.equipmentSlots.items[i];

            if (ele !== null) {
                this.equipmentSlots.items.push(Item.getFromJSON(ele));
            } else {
                this.equipmentSlots.items.push(null);
            }
        }
    }

    getDamageRange = (): [a: number, b: number] => {
        let damageMin = this.statBlock.damageMin;
        let damageMax = this.statBlock.damageMax;

        for (const equipment of this.equipmentSlots.items) {
            if (equipment) {
                damageMin += equipment.statBlock.damageMin;
                damageMax += equipment.statBlock.damageMax;
            }
        }

        return [damageMin, damageMax];
    };

    getDamageDisplay = (): string => {
        const r = this.getDamageRange();
        return r[0] + ' - ' + r[1];
    };

    getHealthDisplay = (): string => {
        return this.statBlock.healthMin + '/' + this.getHealthMax();
    };

    getStaminaDisplay = (): string => {
        return this.statBlock.staminaMin + '/' + this.getStaminaMax();
    };

    getManaDisplay = (): string => {
        return this.statBlock.manaMin + '/' + this.getManaMax();
    };

    getRandomDamageValue = () => {
        return getRandomValueBetween(...this.getDamageRange());
    };

    getArmor = () => {
        let armor = this.statBlock.armor;
        this.equipmentSlots.items.forEach((v: Equipment | null) => {
            if (v != null) armor += v.statBlock.armor;
        });
        return armor;
    };

    getHealthMax = () => {
        let healthMax = this.statBlock.healthMax;
        this.equipmentSlots.items.forEach((v: Equipment | null) => {
            if (v != null) healthMax += v.statBlock.health;
        });
        return healthMax;
    };

    getStaminaMax = () => {
        let staminaMax = this.statBlock.staminaMax;
        this.equipmentSlots.items.forEach((v: Equipment | null) => {
            if (v != null) staminaMax += v.statBlock.stamina;
        });
        return staminaMax;
    };

    getManaMax = () => {
        let manaMax = this.statBlock.manaMax;
        this.equipmentSlots.items.forEach((v: Equipment | null) => {
            if (v != null) manaMax += v.statBlock.mana;
        });
        return manaMax;
    };

    addItemToInventory = (item: Item) => {
        this.inventory.items.push(item);
    };

    healHealth = (x: number) => {
        this.statBlock.healthMin += x;

        if (this.statBlock.healthMin > this.statBlock.healthMax) {
            this.statBlock.healthMin = this.statBlock.healthMax;
        }
    };
}