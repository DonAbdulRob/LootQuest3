import React from 'react';
import MainButton from '../../Components/Buttons/MainButton';
import Fighter from '../../Models/Fighter/Fighter';
import { __GLOBAL_GAME_STORE } from '../../Models/GlobalGameStore';
import CombatState, { CombatStateEnum } from '../../Models/Shared/CombatState';
import { __GLOBAL_REFRESH_FUNC_REF } from '../../Pages/PlayPage';
import { ConsoleData } from '../Console/Console';
import LootTransition from './LootTransition';

function handleAttack(
    player: Fighter,
    enemy: Fighter,
    combatState: CombatState,
    consoleData: ConsoleData,
) {
    // var init
    let playerArmor = player.getArmor();
    let enemyArmor = enemy.getArmor();
    let playerDamage = player.getDamage() - enemyArmor;
    let enemyDamage = enemy.getDamage() - playerArmor;

    // Cap damage to 0 minimum.
    if (playerDamage < 0) {
        playerDamage = 0;
    }

    if (enemyDamage < 0) {
        enemyDamage = 0;
    }

    player.statBlock.healthMin -= enemyDamage;
    enemy.statBlock.healthMin -= playerDamage;

    consoleData.add('Player hit for ' + playerDamage);
    consoleData.add('Enemy hit for ' + enemyDamage);

    if (player.statBlock.healthMin <= 0) {
        consoleData.add(
            'You died, but a passing Cleric revived you at full life. (Nice!)',
        );
        player.statBlock.healthMin = player.statBlock.healthMax;
        combatState.advance();
    }

    if (enemy.statBlock.healthMin <= 0) {
        consoleData.add('Enemy died.');
        enemy.reset();
        combatState.advance();
    }

    __GLOBAL_REFRESH_FUNC_REF();
}

function startFight(combatState: CombatState) {
    if (combatState.combatState === CombatStateEnum.OUT_OF_COMBAT) {
        combatState.advance();
        __GLOBAL_REFRESH_FUNC_REF();
    }
}

export default function Combat(props: {}): JSX.Element {
    let player = __GLOBAL_GAME_STORE((__DATA: any) => __DATA.player);
    let enemy = __GLOBAL_GAME_STORE((__DATA: any) => __DATA.enemy);
    let combatState = __GLOBAL_GAME_STORE((__DATA: any) => __DATA.combatState);
    let consoleData = __GLOBAL_GAME_STORE((__DATA: any) => __DATA.consoleData);
    let display;

    switch (combatState.combatState) {
        case CombatStateEnum.OUT_OF_COMBAT:
            display = (
                <div>
                    <p>No enemy yet!</p>
                    <MainButton
                        text="Find Fight"
                        callBack={() => {
                            startFight(combatState);
                        }}
                    ></MainButton>
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
                </div>
            );
            break;
        case CombatStateEnum.LOOTING:
            display = <LootTransition />;
            break;
        default:
            display = <div></div>;
    }

    return display;
}
