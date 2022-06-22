/**
 * The Monster Generator is a tool used to generate monsters from pre-defined base types.
 * This class is abstract because we only want to create instances of the 'MG_' prefixed files within the './MonsterGenerators' folder.
 */
import { G_getRandomValueUpTo } from '../../Helper';
import { IStatBlock } from '../../Shared/IStatBlock';
import { GameDifficulty } from '../../Singles/GameDifficulty';

export abstract class MonsterGenerator {
    unknownName: string;
    unknownDescription: string;
    knownName: string;
    knownDescription: string;
    level: number = -1;
    baseLevel: number = -1; // derives our level property.
    statBlock: IStatBlock;
    isNameKnown = false; // By default, names aren't known.

    constructor(statBlock: IStatBlock, baseLevel: number, gameDifficulty: GameDifficulty) {
        this.baseLevel = baseLevel;
        this.statBlock = statBlock;
        this.unknownName = '';
        this.unknownDescription = '';
        this.knownName = '';
        this.knownDescription = '';
        this.setLevel(gameDifficulty);
        this.setProperties();
    }

    abstract setProperties(): void;

    setLevel(gameDifficulty: GameDifficulty) {
        // If our base level is -1, we assume it gets set in this.setProperties() constructor call. So, return.
        if (this.baseLevel === -1) {
            return;
        }

        // Otherwise, set level to semi-random value.
        let level = this.baseLevel;

        // Factor in difficulty.
        level = level * gameDifficulty.getDifficultyData().monsterLevelMultiplier;

        // Factor in monster level deviation
        let levelDiff = (G_getRandomValueUpTo(20) + 1) * 0.01; // +-20% (* 0.2 or * -0.2)

        if (G_getRandomValueUpTo(1) === 0) {
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

    setNames(name: string) {
        this.unknownName = name;
        this.knownName = name;
    }

    setDescriptions(name: string) {
        this.unknownDescription = name;
        this.knownDescription = name;
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
}
