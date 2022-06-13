/**
 * Monster ability container can hold direct function references since it doesn't need serialized.
 */

import { ConsoleData } from '../../../WIndowContent/Console/Console';
import CombatState from '../../Shared/CombatState';
import { Monster, Player } from '../Fighter';

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
        // TODO: Move 'dealt damage' calc into fighter class, same for combat class.
        let damage = monster.getRandomDamageValue() + 3 - player.statBlock.armor;

        if (damage < 0) {
            damage = 0;
        }

        player.statBlock.healthMin -= damage;
        consoleData.add(monster.name + ' uses Feral Strike and deals ' + damage + ' damage to you.');
    };
}
