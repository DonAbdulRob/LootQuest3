/**
 * This file holds all our data relating to game difficulty to be used throughout the game as needed.
 */
export enum DifficultyEnum {
    Easy,
    Normal,
    Hard,
    Insane,
}

export interface DifficultyMultiplierInterface {
    monsterLevelMultiplier: number;
    playerHealingMultiplier: number;
}

export class GameDifficulty {
    difficulty: DifficultyEnum = DifficultyEnum.Normal; // Normal by default.

    /** Returns multipliers based on difficulty */
    getDifficultyMultiplier(): DifficultyMultiplierInterface {
        switch (this.difficulty) {
            case DifficultyEnum.Normal:
                return {
                    monsterLevelMultiplier: 1,
                    playerHealingMultiplier: 1,
                };
            case DifficultyEnum.Hard:
                return {
                    monsterLevelMultiplier: 1.2,
                    playerHealingMultiplier: 0.5,
                };
            case DifficultyEnum.Insane:
                return {
                    monsterLevelMultiplier: 1.4,
                    playerHealingMultiplier: 0.25,
                };
            default:
                return {
                    monsterLevelMultiplier: 0.8,
                    playerHealingMultiplier: 1.5,
                };
        }
    }
}
