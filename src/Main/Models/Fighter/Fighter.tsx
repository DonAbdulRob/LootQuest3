import { getRandomValueBetween } from "../Helper";
import StatBlock from "../Shared/StatBlock";
import Inventory, { Equipment, Item } from "./Inventory";

export default class Fighter {
    name: string = "";
    isPlayer: boolean = false;
    statBlock: StatBlock = new StatBlock();
    inventory: Inventory = new Inventory();
    equipment: Equipment = new Equipment();

    constructor(isPlayer: boolean) {
        this.isPlayer = isPlayer;
        this.reset();
    }

    reset = () => {
        if (this.isPlayer) {
            this.name = "Joe";
            this.statBlock.healthMin = 100;
            this.statBlock.healthMax = 100;
            this.statBlock.damageMin = 2;
            this.statBlock.damageMax = 4;
        } else {
            this.name = "Monster";
            this.statBlock.healthMin = 20;
            this.statBlock.healthMax = 20;
            this.statBlock.damageMin = 1;
            this.statBlock.damageMax = 3;
        }
    }

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
    }

    getDamageDisplay = (): string => {
        const r = this.getDamageRange();
        return r[0] + "-" + r[1];
    }
    
    getDamage = () => {
        return getRandomValueBetween(...this.getDamageRange());
    }

    getArmor = () => {
        let armor = this.statBlock.armor;
        this.equipment.items.forEach((v: Item | null) => { if (v != null) armor += v.armor });
        return armor;
    }
}
