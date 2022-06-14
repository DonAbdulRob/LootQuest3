import React from 'react';
import { MonsterEffectFunctionTemplate } from '../../../Models/Fighter/Ability/MonsterAbilityContainer';
import { Player, PlayerActivity } from '../../../Models/Fighter/Player';
import { Monster } from '../../../Models/Fighter/Monster';
import { __GLOBAL_GAME_STORE } from '../../../Models/GlobalGameStore';
import { getRandomElement, getRandomValueUpTo } from '../../../Models/Helper';
import CombatState from '../../../Models/Shared/CombatState';
import { __GLOBAL_REFRESH_FUNC_REF } from '../../../Pages/PlayPage';
import { ConsoleData } from '../../Console/ConsoleComponent';
import LootTransitionComponent from './LootTransitionComponent';
import GameStateManager from '../../../Models/Singles/GameStateManager';

export interface CustomDamageMessage {
    prefix: string;
    suffix: string;
}

function getCustomDamageMessage(customDamageMessage: CustomDamageMessage, damage: number) {
    return customDamageMessage.prefix + damage + customDamageMessage.suffix;
}

export function processCombatRound(
    player: Player,
    enemy: Monster,
    combatState: CombatState,
    consoleData: ConsoleData,
    gameStateManager: GameStateManager,
    customDamageMessage?: CustomDamageMessage | null,
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

    // If player has skip turn status, skip over damage portion entirely.
    if (!player.statusContainer.hasSkipTurnStatus()) {
        enemy.statBlock.healthMin -= playerDamage;

        if (customDamageMessage !== undefined && customDamageMessage !== null) {
            consoleData.add(getCustomDamageMessage(customDamageMessage, playerDamage));
        } else {
            consoleData.add('You perform a basic attack for ' + playerDamage + ' damage.');
        }
    }

    // Always reduce status turns for the player.
    player.statusContainer.reduceStatusTurns();

    // If enemy died, then handle enemy death.
    if (enemy.statBlock.healthMin <= 0) {
        consoleData.add('Enemy died.');
        player.gold += enemy.gold;
        player.giveExperience(enemy, consoleData);
        player.setLooting();

        // Generate loot.
        combatState.generateNewLoot();

        // End combat if no loot, else show loot screen.
        if (combatState.loot.length === 0) {
            player.setCombatOver();
        } else {
            player.setLooting();
        }

        __GLOBAL_REFRESH_FUNC_REF();
        return;
    }
    // Else, continue combat.

    /**
     * Execute Monster attack.
     */

    // If there are any abilities, roll 25% chance to use it.
    let enemyAbilities: Array<MonsterEffectFunctionTemplate> = enemy.abilities.abilityArray;
    let usedAbility = false;

    if (enemyAbilities.length > 0) {
        let abilityUseChance = getRandomValueUpTo(4); // 20% chance.

        if (abilityUseChance === 0) {
            usedAbility = true;

            let doAbility: MonsterEffectFunctionTemplate = getRandomElement(enemyAbilities);

            // Do the ability.
            doAbility(enemy, player, combatState, consoleData);
        }
    }

    // Otherwise, do basic attack.
    if (!usedAbility) {
        player.statBlock.healthMin -= enemyDamage;
        consoleData.add(enemy.name + ' hits you for ' + enemyDamage + ' damage.');
    }

    // Reduce enemy status effect turns.
    enemy.statusContainer.reduceStatusTurns();

    // If Player died, handle player death.
    if (player.statBlock.healthMin <= 0) {
        consoleData.add('You died, but a passing Cleric revived you at full life. (Nice!)');

        // Heal and clear statuses.
        player.statBlock.healthMin = player.statBlock.healthMax;
        player.statusContainer.clear();

        // Reset combat state.
        player.setCombatOver();
        __GLOBAL_REFRESH_FUNC_REF();
        return;
    }
    // Else, continue combat.

    // Refresh!
    __GLOBAL_REFRESH_FUNC_REF();
}

export default function CombatComponent(): JSX.Element {
    let player: Player = __GLOBAL_GAME_STORE((__DATA: any) => __DATA.player);
    let enemy: Monster = __GLOBAL_GAME_STORE((__DATA: any) => __DATA.enemy);
    let combatState: CombatState = __GLOBAL_GAME_STORE((__DATA: any) => __DATA.combatState);
    let gameStateManager: GameStateManager = __GLOBAL_GAME_STORE((__DATA: any) => __DATA.gameState);
    let consoleData: ConsoleData = __GLOBAL_GAME_STORE((__DATA: any) => __DATA.consoleData);
    let display;

    switch (player.activity) {
        case PlayerActivity.IN_COMBAT_FIGHTING:
            display = (
                <div>
                    <h1>
                        {player.name} vs. {enemy.name}
                    </h1>
                    <p>
                        {player.statBlock.healthMin} vs. {enemy.statBlock.healthMin}
                    </p>
                    <button
                        onClick={() => {
                            processCombatRound(player, enemy, combatState, consoleData, gameStateManager);
                        }}
                    >
                        Attack
                    </button>
                    <button
                        onClick={() => {
                            // Give player +2 bonus armor.

                            // Give player skip_turn status.

                            // Process combat round.
                            processCombatRound(player, enemy, combatState, consoleData, gameStateManager);
                        }}
                    >
                        Defend
                    </button>
                    <button
                        onClick={() => {
                            // Attempt to flee. On success, return, else, continue combat.

                            // Give player skip_turn status.

                            // Process combat round.
                            processCombatRound(player, enemy, combatState, consoleData, gameStateManager);
                        }}
                    >
                        Flee
                    </button>
                </div>
            );
            break;
        case PlayerActivity.IN_COMBAT_LOOTING:
            display = <LootTransitionComponent />;
            break;
        default:
            display = <div></div>;
    }

    return <div className="combat-window">{display}</div>;
}
