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
    description: string;
    monsterLevelMultiplier: number;
    playerHealingMultiplier: number;
}

export class GameDifficulty {
    difficulty: DifficultyEnum = DifficultyEnum.Normal; // Normal by default.

    /** Returns multipliers based on difficulty */
    getDifficultyData(): DifficultyMultiplierInterface {
        switch (this.difficulty) {
            case DifficultyEnum.Normal:
                return {
                    description:
                        'Normal mode is the most fair mode and presents a reasonable level of fun and challenge.',
                    monsterLevelMultiplier: 1,
                    playerHealingMultiplier: 1,
                };
            case DifficultyEnum.Hard:
                return {
                    description:
                        'Hard mode stacks the odds against you and challenges you to outbrain your opponents to win.',
                    monsterLevelMultiplier: 1.2,
                    playerHealingMultiplier: 0.5,
                };
            case DifficultyEnum.Insane:
                return {
                    description:
                        "Insane mode is hard mode on steroids. Skill is not enough to win. You need determination. (You've been warned.)",
                    monsterLevelMultiplier: 1.4,
                    playerHealingMultiplier: 0.25,
                };
            default:
                return {
                    description:
                        'Easy mode is a more relaxing experience with weaker monsters and less punishing encounters.',
                    monsterLevelMultiplier: 0.8,
                    playerHealingMultiplier: 1.5,
                };
        }
    }
}
