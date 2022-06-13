import { getRandomValueUpTo } from '../Helper';
import { MonsterAbilityContainer } from './Ability/MonsterAbilityContainer';
import { Fighter } from './Fighter';

export class Monster extends Fighter {
    abilities: MonsterAbilityContainer = new MonsterAbilityContainer();

    constructor() {
        super();
        this.generateMonster();
    }

    generateMonster = () => {
        this.reset();

        let monsterType = getRandomValueUpTo(2);
        this.experience = -1;
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

        // Generate abilities.
        this.abilities = new MonsterAbilityContainer();
    };
}
