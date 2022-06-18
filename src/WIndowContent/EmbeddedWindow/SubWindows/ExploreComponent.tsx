import React from 'react';
import EAreaType from '../../../Models/Area/EAreaType';
import { Monster } from '../../../Models/Fighter/Monster';
import { Player } from '../../../Models/Fighter/Player';
import { IRootStore, __GLOBAL_GAME_STORE } from '../../../Models/GlobalGameStore';
import { getRandomValueBetween, getRandomValueUpTo } from '../../../Models/Helper';
import { ItemGen } from '../../../Models/Item/ItemGen';
import GameStateManager from '../../../Models/Singles/GameStateManager';
import { __GLOBAL_REFRESH_FUNC_REF } from '../../../Pages/PlayPage';
import { RpgConsole } from '../../../Models/Singles/RpgConsole';
import CombatComponent from '../Combat/CombatComponent';

function explore(store: IRootStore) {
    let rollRes = getRandomValueUpTo(100);
    let player: Player = store.player;
    let enemy: Monster = store.enemy;
    let rpgConsole: RpgConsole = store.rpgConsole;
    let gameStateManager: GameStateManager = store.gameStateManager;

    // Always reset explore output.
    gameStateManager.exploreOutput = '';
    let str = '';

    // Combat result.
    if (rollRes <= 75) {
        let monsterLevel = getRandomValueBetween(player.currentArea.levelMin, player.currentArea.levelMax);
        enemy.generateMonster(monsterLevel, gameStateManager.gameDifficulty);
        rpgConsole.add('A monster appears: ' + enemy.name);
        player.setCombatStart();
        __GLOBAL_REFRESH_FUNC_REF();
    }

    // Harvest result
    else if (rollRes <= 95) {
        let res = player.inventory.addItem(player, ItemGen.getWood());
        str = 'You chop woods for a while and find some logs.';

        if (res) {
            str += ` But, you don't have enough inventory space to carry any, so you leave them behind.`;
        }

        rpgConsole.add(str);
        gameStateManager.exploreOutput = str;
        __GLOBAL_REFRESH_FUNC_REF();
    }

    // Special result.
    else {
        str = 'A pixie appears and grants you 2 bonus hit points. AMAZING!';
        rpgConsole.add(str);
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
