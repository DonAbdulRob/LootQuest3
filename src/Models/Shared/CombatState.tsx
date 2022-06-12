import { Item } from '../Item/Item';

export enum CombatStateEnum {
    OUT_OF_COMBAT,
    IN_COMBAT,
    LOOTING,
}

export default class CombatState {
    round: number = 0;
    combatState: number = 0;
    loot: Array<Item> = [];
    generateLootLock: boolean = false;

    advance = () => {
        this.combatState = (this.combatState + 1) % 3;
    };

    reset = () => {
        this.combatState = 0;
    };

    enableLootLock = () => {
        this.generateLootLock = true;
    };

    disableLootLock = () => {
        this.generateLootLock = false;
    };
}
