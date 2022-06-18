import React from 'react';
import EAreaType from '../../../Models/Area/EAreaType';
import { Monster } from '../../../Models/Fighter/Monster';
import { Player } from '../../../Models/Fighter/Player';
import { IRootStore, __GLOBAL_GAME_STORE } from '../../../Models/GlobalGameStore';
import { getRandomValueBetween, getRandomValueUpTo } from '../../../Models/Helper';
import { ItemGen } from '../../../Models/Item/ItemGen';
import GameStateManager from '../../../Models/Singles/GameStateManager';
import { __GLOBAL_REFRESH_FUNC_REF } from '../../../Pages/PlayPage';
import { ConsoleData } from '../../Console/ConsoleComponent';
import CombatComponent from '../Combat/CombatComponent';

function explore(store: IRootStore) {
    let res = getRandomValueUpTo(100);
    let player: Player = store.player;
    let enemy: Monster = store.enemy;
    let consoleData: ConsoleData = store.consoleData;
    let gameStateManager: GameStateManager = store.gameStateManager;

    // Always reset explore output.
    gameStateManager.exploreOutput = '';
    let str = '';

    // Combat result.
    if (res <= 75) {
        let monsterLevel = getRandomValueBetween(player.currentArea.levelMin, player.currentArea.levelMax);
        enemy.generateMonster(monsterLevel, gameStateManager.gameDifficulty);
        consoleData.add('A monster appears: ' + enemy.name);
        player.setCombatStart();
        __GLOBAL_REFRESH_FUNC_REF();
    }

    // Harvest result
    else if (res <= 95) {
        str = 'You chop woods for a while and find some logs.';
        consoleData.add(str);
        player.inventory.addItem(ItemGen.getWood());
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
    let store: IRootStore = __GLOBAL_GAME_STORE((__DATA) => __DATA);
    let player: Player = store.player;
    let gameStateManager: GameStateManager = store.gameStateManager;
    let content = null;

    // Display vars.
    let areaArt = null;

    if (player.currentArea.type === EAreaType.TOWN) {
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
                        explore(store);
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
