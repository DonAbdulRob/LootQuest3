import { PlayerAbilityContainer } from './Ability/PlayerAbilityContainer';
import { Fighter } from './Fighter';
import { immerable } from 'immer';

export class Player extends Fighter {
    [immerable] = true;
    abilities: PlayerAbilityContainer = new PlayerAbilityContainer();

    constructor() {
        super();
        this.generatePlayer();
    }

    generatePlayer = () => {
        this.name = 'Joe';
        this.level = 1;
        this.experience = 0;
        this.gold = 0;
        this.statBlock.healthMin = 10;
        this.statBlock.healthMax = 10;
        this.statBlock.staminaMin = 5;
        this.statBlock.staminaMax = 5;
        this.statBlock.manaMin = 5;
        this.statBlock.manaMax = 5;
        this.statBlock.damageMin = 1;
        this.statBlock.damageMax = 2;
    };
}
