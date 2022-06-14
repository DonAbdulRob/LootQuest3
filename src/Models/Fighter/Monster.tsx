import { getRandomValueBetween, getRandomValueUpTo } from '../Helper';
import { GameDifficulty } from '../Singles/GameDifficulty';
import { MonsterAbilityContainer } from './Ability/MonsterAbilityContainer';
import { Fighter } from './Fighter';

export class Monster extends Fighter {
    abilities: MonsterAbilityContainer = new MonsterAbilityContainer();

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

    setLevel(baseLevel: number, gameDifficulty: GameDifficulty) {
        // Level starts off based on area level.
        let level = baseLevel;

        // Factor in difficulty.
        level = level * gameDifficulty.getDifficultyMultiplier().monsterLevelMultiplier;

        // Factor in monster level deviation
        let x = getRandomValueBetween(0, 1);
        let levelDiff = (getRandomValueUpTo(20) + 1) * 0.01; // +-20% (* 0.2 or * -0.2)

        if (x === 0) {
            level *= levelDiff * -1;
        } else {
            level *= levelDiff;
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

        // Set remaining values with no dependencies next.
        let monsterType = getRandomValueUpTo(2); // Picks a random monster type to encounter. (TODO: Make area specific later.)
        let g_s = (x: number) => {
            return this.getLevelScaledStat_SLOW(x);
        };
        let g_m = (x: number) => {
            return this.getLevelScaledStat_MEDIUM(x);
        };
        let g_h = (x: number) => {
            return this.getLevelScaledStat_HEALTH(x);
        };

        // Set rest
        this.experience = 2;
        this.gold = this.level * 2;

        if (monsterType === 0) {
            // Highest health in bracket.
            this.name = 'Adorable Rat';
            this.statBlock.healthMin = g_h(4);
            this.statBlock.healthMax = g_h(4);
            this.statBlock.damageMin = g_m(1);
            this.statBlock.damageMax = g_m(1);
        } else if (monsterType === 1) {
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

        // Generate abilities.
        this.abilities = new MonsterAbilityContainer();
    };
}

/**
 * 
let g_f = (x: number) => {
    return this.getLevelScaledStat_FAST(x);
};
    */
