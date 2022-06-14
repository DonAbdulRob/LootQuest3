import { PlayerAbilityContainer } from './Ability/PlayerAbilityContainer';
import { Fighter } from './Fighter';
import { immerable } from 'immer';
import { ConsoleData } from '../../WIndowContent/Console/Console';
import { __GLOBAL_REFRESH_FUNC_REF } from '../../Pages/PlayPage';

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

    giveExperience = (x: number, consoleData: ConsoleData) => {
        let expToLevel = this.getExpToLevel();
        this.experience += x;

        if (this.experience >= expToLevel) {
            this.experience -= expToLevel;
            this.level += 1;

            // Increase resources.
            this.statBlock.healthMax += 2;
            this.statBlock.manaMax += 1;
            this.statBlock.staminaMax += 1;

            // Heal.
            this.statBlock.healthMin = this.statBlock.healthMax;
            this.statBlock.manaMin = this.statBlock.manaMax;
            this.statBlock.staminaMin = this.statBlock.staminaMax;

            // Every 2 levels gain 1 armor and +1/1 damage. (Start at level 1, so check at 3, 5, 7, etc.).
            if (this.level % 3 === 0 || (this.level > 3 && this.level % 2 === 1)) {
                this.statBlock.armor += 1;
                this.statBlock.damageMin += 1;
                this.statBlock.damageMax += 1;
            }

            consoleData.add('You have leveled up to ' + this.level + '!');
            __GLOBAL_REFRESH_FUNC_REF();
        }
    };
}
