/* eslint-disable no-fallthrough */ // < we WANT fall-through for names.
import { getRandomValueBetween, getRandomValueUpTo } from '../Helper';
import { StatBlock } from '../Shared/StatBlock';
import { GameDifficulty } from '../Singles/GameDifficulty';
import { MonsterAbilityContainer } from './Ability/MonsterAbilityContainer';
import { Fighter } from './Fighter';

export class Monster extends Fighter {
    areaLevel: number = 0;
    abilities: MonsterAbilityContainer = new MonsterAbilityContainer();

    setLevel(areaLevel: number, gameDifficulty: GameDifficulty) {
        // Level starts off based on area level.
        this.areaLevel = areaLevel; // Store untampered level for later use.
        let level = areaLevel;

        // Factor in difficulty.
        level = level * gameDifficulty.getDifficultyMultiplier().monsterLevelMultiplier;

        // Factor in monster level deviation
        let levelDiff = (getRandomValueUpTo(20) + 1) * 0.01; // +-20% (* 0.2 or * -0.2)

        if (getRandomValueBetween(0, 1) === 0) {
            level *= 1 + levelDiff * -1;
        } else {
            level *= 1 + levelDiff;
        }

        if (level < 1) {
            level = 1;
        }

        // Round and set value at the end.
        this.level = Math.round(level);
    }

    generateMonster = (baseLevel: number, gameDifficulty: GameDifficulty) => {
        this.reset();

        // Always set monster level first.
        this.setLevel(baseLevel, gameDifficulty);

        // Determine monster type.
        // let monsterType = getRandomValueUpTo(2); // Picks a random monster type to encounter. (TODO: Make area specific later.)

        // Set rest
        this.experience = 2;
        this.gold = this.level * 2;

        // Always adorable rat to start.
        let mtc = new MonsterTypeContainer(this.level, this.statBlock);
        mtc.setAdorableRat();
        this.name = mtc.name;

        /**
         * 
        if (monsterType === 0) {
            // Highest health in bracket.
            this.name = 'Adorable Rat';
            mtc.setAdorableRat();
        }

        else if (monsterType === 1) {
            // Strong attacks.
            this.name = 'Smol Kitten';
            this.statBlock.healthMin = g_h(3);
            this.statBlock.healthMax = g_h(3);
            this.statBlock.damageMin = g_m(1);
            this.statBlock.damageMax = g_m(2);
        } else if (monsterType === 2) {
            // Some armor.
            this.name = 'Baby Turtle';
            this.statBlock.healthMin = g_h(2);
            this.statBlock.healthMax = g_h(2);
            this.statBlock.damageMin = g_m(1);
            this.statBlock.damageMax = g_m(1);
            this.statBlock.armor = g_s(1); // Slower armor scaling.
        }
        */

        // Generate abilities.
        this.abilities = new MonsterAbilityContainer();
    };
}

class MonsterTypeContainer {
    level: number;
    statBlock: StatBlock;
    name: string;

    constructor(level: number, statBlock: StatBlock) {
        this.level = level;
        this.statBlock = statBlock;
        this.name = '';
    }

    getLevelScaledStat_SLOW(baseVal: number) {
        return Math.round(baseVal * this.level * 1.4);
    }

    getLevelScaledStat_MEDIUM(baseVal: number) {
        return Math.round(baseVal * this.level * 2);
    }

    getLevelScaledStat_FAST(baseVal: number) {
        return Math.round(baseVal * this.level * 2.5);
    }

    getLevelScaledStat_HEALTH(baseVal: number) {
        return Math.round(baseVal + baseVal * this.level * 0.825);
    }

    setAdorableRat() {
        switch (this.level) {
            case 1:
                this.name = 'Adorable Mouse';
                this.statBlock.healthMin = 4;
                this.statBlock.healthMax = 4;
                this.statBlock.damageMin = 1;
                this.statBlock.damageMax = 1;
                break;
            case 2:
                this.name = 'Small Rat';
                this.statBlock.healthMin = 9;
                this.statBlock.healthMax = 9;
                this.statBlock.damageMin = 2;
                this.statBlock.damageMax = 3;
                break;
            case 3:
                this.name = 'Rat';
                this.statBlock.healthMin = 18;
                this.statBlock.healthMax = 18;
                this.statBlock.damageMin = 3;
                this.statBlock.damageMax = 5;
                break;
            case 4:
                this.name = 'Big Rat';
                this.statBlock.healthMin = 30;
                this.statBlock.healthMax = 30;
                this.statBlock.damageMin = 5;
                this.statBlock.damageMax = 7;
                break;
            case 7:
                this.name = 'Massive Rat';
            case 10:
                this.name = 'Rat King';
            case 15:
                this.name = 'Rat Proginator';
            default:
                this.statBlock.healthMin = this.getLevelScaledStat_HEALTH(4);
                this.statBlock.healthMax = this.getLevelScaledStat_HEALTH(4);
                this.statBlock.damageMin = this.getLevelScaledStat_MEDIUM(1);
                this.statBlock.damageMax = this.getLevelScaledStat_MEDIUM(1);
        }
    }
}
