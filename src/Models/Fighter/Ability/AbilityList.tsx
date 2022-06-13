/**
 * This class holds our definition for what an ability is and also defines our list of pre-defined abilities.
 * Abilities are special powers that fighters can use for, generally, some resource cost.
 */
import * as AbilityEffects from './AbilityToCoreEffectMapper';

export class Ability {
    name: string;
    loreDescription: string;
    literalDescription: string;
    staminaCost: number;
    manaCost: number;
    effectFunctionReference: number;

    constructor(
        name: string,
        loreDescription: string,
        literalDescription: string,
        staminaCost: number,
        manaCost: number,
        effectFunctionReference: number,
    ) {
        this.name = name;
        this.loreDescription = loreDescription;
        this.literalDescription = literalDescription;
        this.staminaCost = staminaCost;
        this.manaCost = manaCost;
        this.effectFunctionReference = effectFunctionReference;
    }
}

export const G_PLAYER_ABILITY_LIST = {
    POWER_STRIKE: new Ability(
        'Power Strike',
        'Exert yourself to attack with much a tad more force than normal.',
        'Attack with +2 Total Damage',
        1,
        0,
        AbilityEffects.ABILITY_ID_POWER_STRIKE,
    ),
    LESSER_HEAL: new Ability(
        'Lesser Heal',
        `The weakest healing spell, known for being both expensive and ineffective. It will heal only a small cut at best.`,
        'Heal +1 health',
        0,
        3,
        AbilityEffects.ABILITY_ID_LESSER_HEAL,
    ),
};
