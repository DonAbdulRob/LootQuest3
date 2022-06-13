/**
 * This is a container for abilities that is generally attached to living entities like fighters.
 */
import { Ability, G_PLAYER_ABILITY_LIST } from './AbilityList';

export class PlayerAbilityContainer {
    abilityArray: Array<Ability> = [];

    constructor() {
        this.abilityArray.push(G_PLAYER_ABILITY_LIST.POWER_STRIKE, G_PLAYER_ABILITY_LIST.LESSER_HEAL);
    }

    clear() {
        this.abilityArray = [];
    }
}
