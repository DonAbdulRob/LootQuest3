import { getRandomValueBetween, getRandomValueUpTo } from '../Helper';
import StatBlock from '../Shared/StatBlock';
import Inventory, { Equipment } from './Inventory';
import { Item } from './Item';

export default class Fighter {
    name: string = '';
    level: number = 0;
    exp: number = 0;
    gold: number = 0;
    isPlayer: boolean = false;
    statBlock: StatBlock = new StatBlock();
    inventory: Inventory = new Inventory();
    equipment: Equipment = new Equipment();

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
            this.statBlock.damageMin = 1;
            this.statBlock.damageMax = 2;
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

        for (const item of this.equipment.items) {
            if (item) {
                damageMin += item.minDamage;
                damageMax += item.maxDamage;
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

    getDamage = () => {
        return getRandomValueBetween(...this.getDamageRange());
    };

    getArmor = () => {
        let armor = this.statBlock.armor;
        this.equipment.items.forEach((v: Item | null) => {
            if (v != null) armor += v.armor;
        });
        return armor;
    };

    getHealthMax = () => {
        let healthMax = this.statBlock.healthMax;
        this.equipment.items.forEach((v: Item | null) => {
            if (v != null) healthMax += v.health;
        });
        return healthMax;
    };

    addItemToInventory = (item: Item) => {
        this.inventory.items.push(item);
    };
}
