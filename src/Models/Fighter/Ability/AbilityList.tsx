/**
 * This class holds our definition for what an ability is and also defines our list of pre-defined abilities.
 * Abilities are special powers that fighters can use for, generally, some resource cost.
 */
import * as AbilityEffects from './AbilityToCoreEffectMapper';

export class Ability {
    name: string;
    description: string;
    staminaCost: number;
    manaCost: number;
    effectFunctionReference: number;

    constructor(
        name: string,
        description: string,
        staminaCost: number,
        manaCost: number,
        effectFunctionReference: number,
    ) {
        this.name = name;
        this.description = description;
        this.staminaCost = staminaCost;
        this.manaCost = manaCost;
        this.effectFunctionReference = effectFunctionReference;
    }
}

export const _G_ABILITY_LIST = {
    POWER_STRIKE: new Ability(
        'Power Strike',
        'Attack harder than normal. Deal +2 damage.',
        1,
        0,
        AbilityEffects.ABILITY_ID_POWER_STRIKE,
    ),
};
