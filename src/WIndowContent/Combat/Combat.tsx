import React from 'react';
import { ABILITY_EFFECT_FUNCTION } from '../../Models/Fighter/Ability/AbilityToCoreEffectMapper';
import Fighter from '../../Models/Fighter/Fighter';
import { __GLOBAL_GAME_STORE } from '../../Models/GlobalGameStore';
import CombatState, { CombatStateEnum } from '../../Models/Shared/CombatState';
import { __GLOBAL_REFRESH_FUNC_REF } from '../../Pages/PlayPage';
import { ConsoleData } from '../Console/Console';
import LootTransition from './LootTransition';

export interface CustomDamageMessage {
    prefix: string;
    suffix: string;
}

function getCustomDamageMessage(
    customDamageMessage: CustomDamageMessage,
    damage: number,
) {
    return customDamageMessage.prefix + damage + customDamageMessage.suffix;
}

export function handleAttack(
    player: Fighter,
    enemy: Fighter,
    combatState: CombatState,
    consoleData: ConsoleData,
    customDamageMessage?: CustomDamageMessage,
) {
    // var init
    let playerArmor = player.getArmor();
    let enemyArmor = enemy.getArmor();

    /**
     * Damage Calcs
     */

    let playerDamage = player.getRandomDamageValue() - enemyArmor;
    let enemyDamage = enemy.getRandomDamageValue() - playerArmor;

    // Cap damage to 0 minimum.
    if (playerDamage < 0) {
        playerDamage = 0;
    }

    if (enemyDamage < 0) {
        enemyDamage = 0;
    }

    /**
     * Execute Player attack.
     */

    enemy.statBlock.healthMin -= playerDamage;

    if (customDamageMessage !== undefined) {
        consoleData.add(
            getCustomDamageMessage(customDamageMessage, playerDamage),
        );
    } else {
        consoleData.add(
            'You perform a basic attack for ' + playerDamage + ' damage.',
        );
    }

    // Reduce status turns for the player.
    player.statusContainer.reduceStatusTurns();

    // If enemy died, then handle enemy death.
    if (enemy.statBlock.healthMin <= 0) {
        consoleData.add('Enemy died.');
        player.gold += enemy.gold;
        enemy.nullMonster();
        combatState.advance();
        __GLOBAL_REFRESH_FUNC_REF();
        return;
    }
    // Else, continue combat.

    /**
     * Execute Monster attack.
     */

    player.statBlock.healthMin -= enemyDamage;
    consoleData.add('Enemy hit for ' + enemyDamage);

    // Reduce enemy status effect turns.
    enemy.statusContainer.reduceStatusTurns();

    // If Player died, Handle player death.
    if (player.statBlock.healthMin <= 0) {
        consoleData.add(
            'You died, but a passing Cleric revived you at full life. (Nice!)',
        );
        // Heal and clear statues.
        player.statBlock.healthMin = player.statBlock.healthMax;
        player.statusContainer.clear();
        combatState.reset();
        __GLOBAL_REFRESH_FUNC_REF();
        return;
    }
    // Else, continue combat.

    // Refresh!
    __GLOBAL_REFRESH_FUNC_REF();
}

function startFight(combatState: CombatState) {
    if (combatState.combatState === CombatStateEnum.OUT_OF_COMBAT) {
        combatState.advance();
        __GLOBAL_REFRESH_FUNC_REF();
    }
}

export default function Combat(props: {}): JSX.Element {
    let player: Fighter = __GLOBAL_GAME_STORE((__DATA: any) => __DATA.player);
    let enemy: Fighter = __GLOBAL_GAME_STORE((__DATA: any) => __DATA.enemy);
    let combatState = __GLOBAL_GAME_STORE((__DATA: any) => __DATA.combatState);
    let consoleData = __GLOBAL_GAME_STORE((__DATA: any) => __DATA.consoleData);
    let display;

    switch (combatState.combatState) {
        case CombatStateEnum.OUT_OF_COMBAT:
            display = (
                <div>
                    <p>No enemy yet!</p>
                    <button
                        onClick={() => {
                            enemy.generateMonster();
                            startFight(combatState);
                        }}
                    >
                        Find Fight
                    </button>
                </div>
            );
            break;
        case CombatStateEnum.IN_COMBAT:
            display = (
                <div>
                    <h1>
                        {player.name} vs. {enemy.name}
                    </h1>
                    <p>
                        {player.statBlock.healthMin} vs.{' '}
                        {enemy.statBlock.healthMin}
                    </p>
                    <button
                        onClick={() => {
                            handleAttack(
                                player,
                                enemy,
                                combatState,
                                consoleData,
                            );
                        }}
                    >
                        Attack
                    </button>
                    <button>Defend (Take 50% Damage)</button>
                    <button>Flee</button>
                    <button
                        onClick={() => {
                            let abilityEffectRef =
                                player.abilities.abilityArray[0]
                                    .effectFunctionReference;

                            ABILITY_EFFECT_FUNCTION(abilityEffectRef)(
                                player,
                                enemy,
                                combatState,
                                consoleData,
                            );
                        }}
                    >
                        {player.abilities.abilityArray[0].name} -{' '}
                        {player.abilities.abilityArray[0].description}
                    </button>
                </div>
            );
            break;
        case CombatStateEnum.LOOTING:
            display = <LootTransition />;
            break;
        default:
            display = <div></div>;
    }

    return <div className="window-core">{display}</div>;
}
