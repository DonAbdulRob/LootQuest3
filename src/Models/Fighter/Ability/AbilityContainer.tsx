/**
 * This is a container for abilities that is generally attached to living entities like fighters.
 */
import { Ability, _G_ABILITY_LIST } from './AbilityList';

export class AbilityContainer {
    abilityArray: Array<Ability> = [];

    constructor() {
        this.abilityArray.push(_G_ABILITY_LIST.POWER_STRIKE);
    }
}
