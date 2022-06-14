import React from 'react';
import { AreaType } from '../../../Models/Area/Area';
import { Monster } from '../../../Models/Fighter/Monster';
import { Player } from '../../../Models/Fighter/Player';
import { __GLOBAL_GAME_STORE } from '../../../Models/GlobalGameStore';
import { getRandomValueBetween, getRandomValueUpTo } from '../../../Models/Helper';
import { ItemGen } from '../../../Models/Item/ItemGen';
import CombatState from '../../../Models/Shared/CombatState';
import GameStateManager from '../../../Models/Singles/GameStateManager';
import { __GLOBAL_REFRESH_FUNC_REF } from '../../../Pages/PlayPage';
import { ConsoleData } from '../../Console/ConsoleComponent';
import CombatComponent from '../Combat/CombatComponent';

function startFight(player: Player) {
    player.setCombatStart();
    __GLOBAL_REFRESH_FUNC_REF();
}

function explore(
    player: Player,
    enemy: Monster,
    gameStateManager: GameStateManager,
    combatState: CombatState,
    consoleData: ConsoleData,
) {
    let res = getRandomValueUpTo(100);

    // Always reset explore output.
    gameStateManager.exploreOutput = '';
    let str = '';

    // Combat result.
    if (res <= 75) {
        let monsterLevel = getRandomValueBetween(player.currentArea.levelMin, player.currentArea.levelMax);
        enemy.generateMonster(monsterLevel, gameStateManager.gameDifficulty);
        consoleData.add('A monster appears: ' + enemy.name);
        player.setCombatStart();
        startFight(player);
    }

    // Harvest result
    else if (res <= 95) {
        str = 'You chop woods for a while and find some logs.';
        consoleData.add(str);
        player.addItemToInventory(ItemGen.getWood());
        gameStateManager.exploreOutput = str;
        __GLOBAL_REFRESH_FUNC_REF();
    }

    // Special result.
    else {
        str = 'A pixie appears and grants you 2 bonus hit points. AMAZING!';
        consoleData.add(str);
        player.statBlock.healthMax += 2;
        gameStateManager.exploreOutput = str;
        __GLOBAL_REFRESH_FUNC_REF();
    }
}

export default function ExploreComponent() {
    let player: Player = __GLOBAL_GAME_STORE((__DATA: any) => __DATA.player);
    let enemy: Monster = __GLOBAL_GAME_STORE((__DATA: any) => __DATA.enemy);
    let gameStateManager: GameStateManager = __GLOBAL_GAME_STORE((__DATA: any) => __DATA.gameStateManager);
    let combatState: CombatState = __GLOBAL_GAME_STORE((__DATA: any) => __DATA.combatState);
    let consoleData: ConsoleData = __GLOBAL_GAME_STORE((__DATA: any) => __DATA.consoleData);
    let content = null;

    // Display vars.
    let areaArt = null;

    if (player.currentArea.type === AreaType.TOWN) {
        areaArt = <div>Show town stuff.</div>;
    } else {
        areaArt = <div>Show Wild stuff.</div>;
    }

    if (player.inCombat()) {
        content = <CombatComponent />;
    } else {
        content = (
            <div>
                {areaArt}
                <button
                    className="big-button"
                    onClick={() => {
                        explore(player, enemy, gameStateManager, combatState, consoleData);
                    }}
                >
                    Explore
                </button>
                <p>{gameStateManager.exploreOutput}</p>
            </div>
        );
    }

    return content;
}
