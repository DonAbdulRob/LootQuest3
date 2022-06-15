/**
 * Monster ability container can hold direct function references since it doesn't need serialized.
 */

import { ConsoleData } from '../../../WIndowContent/Console/ConsoleComponent';
import CombatState from '../../Shared/CombatState';
import { Player } from '../Player';
import { Monster } from '../Monster';

export interface MonsterEffectFunctionTemplate {
    (monster: Monster, player: Player, combatState: CombatState, consoleData: ConsoleData): void;
}

export class MonsterAbilityContainer {
    abilityArray: Array<MonsterEffectFunctionTemplate> = [];

    constructor() {
        this.abilityArray.push(MonsterEffectLib.power_strike);
    }

    clear() {
        this.abilityArray = [];
    }
}

// Monster specific effects.
export class MonsterEffectLib {
    static power_strike: MonsterEffectFunctionTemplate = (
        monster: Monster,
        player: Player,
        combatState: CombatState,
        consoleData: ConsoleData,
    ) => {
        let abilityDamage = 2;

        // TODO: Move 'dealt damage' calc into fighter class, same for combat class.
        let damage = monster.getRandomDamageValue() + abilityDamage - player.getArmor();

        if (damage < 0) {
            damage = 0;
        }

        player.statBlock.healthMin -= damage;
        consoleData.add(monster.name + ' uses Feral Strike and deals ' + damage + ' damage to you.');
    };
}
