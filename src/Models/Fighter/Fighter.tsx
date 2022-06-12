/**
 * A fighter represents players and monsters that battle each other.
 * Also, if it is ever decided to make inanimate objects into battle-able entities, this would be used too...
 */
import { getRandomValueBetween, getRandomValueUpTo } from '../Helper';
import { StatBlock } from '../Shared/StatBlock';
import Inventory from '../Item/Inventory';
import { Equipment, Item } from '../Item/Item';
import { AbilityContainer } from './Ability/AbilityContainer';
import { EquipmentSlots } from '../Item/EquipmentSlots';
import { StatusContainer } from './Status';

export default class Fighter {
    name: string = '';
    level: number = 0;
    exp: number = 0;
    gold: number = 0;
    isPlayer: boolean = false;
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
    abilities: AbilityContainer = new AbilityContainer();
    statusContainer: StatusContainer = new StatusContainer();

    getJSON() {
        return JSON.stringify(this);
    }

    fromJSON(str: string) {
        let obj = JSON.parse(str);
        let item1;
        let ele;

        this.name = obj.name;
        this.level = obj.level;
        this.exp = obj.exp;
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

        // TODO de-serialize abilities.
    }

    constructor(isPlayer: boolean) {
        this.isPlayer = isPlayer;

        if (this.isPlayer) {
            this.generatePlayer();
        } else {
            this.nullMonster();
        }
    }

    generatePlayer = () => {
        if (this.isPlayer) {
            this.name = 'Joe';
            this.level = 1;
            this.exp = 0;
            this.gold = 0;
            this.statBlock.healthMin = 10;
            this.statBlock.healthMax = 10;
            this.statBlock.staminaMin = 5;
            this.statBlock.staminaMax = 5;
            this.statBlock.manaMin = 5;
            this.statBlock.manaMax = 5;
            this.statBlock.damageMin = 1;
            this.statBlock.damageMax = 1;
        }
    };

    generateMonster = () => {
        let monsterType = getRandomValueUpTo(2);
        this.exp = -1;
        this.gold = 2;

        if (monsterType === 0) {
            this.name = 'Adorable Rat';
            this.level = 1;
            this.statBlock.healthMin = 5;
            this.statBlock.healthMax = 5;
            this.statBlock.damageMin = 1;
            this.statBlock.damageMax = 1;
        } else if (monsterType === 1) {
            this.name = 'Cute Kitten';
            this.level = 1;
            this.statBlock.healthMin = 3;
            this.statBlock.healthMax = 3;
            this.statBlock.damageMin = 1;
            this.statBlock.damageMax = 2;
        } else if (monsterType === 2) {
            this.name = 'Baby Turtle';
            this.level = 1;
            this.statBlock.healthMin = 2;
            this.statBlock.healthMax = 2;
            this.statBlock.damageMin = 1;
            this.statBlock.damageMax = 1;
            this.statBlock.armor = 1;
        }
    };

    nullMonster = () => {
        this.name = '';
    };

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
