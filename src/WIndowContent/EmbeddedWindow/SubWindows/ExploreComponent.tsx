/**
 * The explore component is used to let the player 'explore' within some area.
 * Exploring leads to encounters, which can develop into literally any type of gameplay event.
 * Also, combat events are stored within the explore component.
 */
import React from 'react';
import EAreaType from '../../../Models/Area/EAreaType';
import { Player } from '../../../Models/Fighter/Player';
import { IRootStore, __GLOBAL_GAME_STORE } from '../../../Models/GlobalGameStore';
import { G_getRandomElement, G_getRandomValueBetween, G_getRandomValueUpTo } from '../../../Models/Helper';
import GameStateManager from '../../../Models/Singles/GameStateManager';
import { __GLOBAL_REFRESH_FUNC_REF } from '../../../App';
import { RpgConsole } from '../../../Models/Singles/RpgConsole';
import CombatComponent from '../Combat/CombatComponent';
import { WiseManEncounter } from '../../../Story/RandomEncounters/WiseManEncounter';
import CombatState from '../../../Models/Shared/CombatState';
import { TownComponent } from './Town/TownComponent';
import { IG_Wood } from '../../../Models/Item/Resources/IG_Wood';
import { IG_Ore } from '../../../Models/Item/Resources/IG_Ore';

function explore(store: IRootStore) {
    let rollRes = G_getRandomValueUpTo(100);
    let player: Player = store.player;
    let rpgConsole: RpgConsole = store.rpgConsole;
    let combatState: CombatState = store.combatState;
    let gameStateManager: GameStateManager = store.gameStateManager;
    let currentarea = player.currentArea;

    // Always reset explore output.
    gameStateManager.exploreOutput = '';
    let str = '';

    // Random Combat result.
    if (rollRes <= 35) {
        combatState.startFight(store);
    }

    // Harvest result
    else if (rollRes <= 90) {
        let areaLevel = G_getRandomValueBetween(currentarea.levelMin, currentarea.levelMax);

        if (currentarea.type === EAreaType.FOREST) {
            let item = G_getRandomElement(new IG_Wood().getResource(0, areaLevel));

            let res = player.inventory.addItem(player, item);
            str = 'You explore for a while and find a suitable tree to harvest from. ';

            if (res) {
                str += ` And, after chopping for a while you acquire one ` + item.name + `.`;
            } else {
                str += ` But, you can't carry anything, so you leave it behind.`;
            }
        } else if (currentarea.type === EAreaType.MINE) {
            let item = G_getRandomElement(new IG_Ore().getResource(0, areaLevel));

            let res = player.inventory.addItem(player, item);
            str = 'You explore for a while and find an ore patch to mine from. ';

            if (res) {
                str += ` And, after mining for a while you acquire one ` + item.name + `.`;
            } else {
                str += ` But, you can't carry anything, so you ignore it.`;
            }
        } else {
            console.log('Area type not implemented yet: ' + currentarea.type);
        }

        rpgConsole.add(str);
        gameStateManager.exploreOutput = str;
        __GLOBAL_REFRESH_FUNC_REF();
    }

    // Start the wise man encounter.
    else if (rollRes <= 95) {
        if (gameStateManager.wiseManEncounter == null) {
            gameStateManager.wiseManEncounter = new WiseManEncounter(store);
        } else {
            rpgConsole.add(`You're walking and think you spot something significant, but, alas, it's just a bird.`);
        }

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
        areaArt = <TownComponent />;
    } else {
        areaArt = (
            <div>
                <h1>{player.currentArea.name}</h1>
                <p>{player.currentArea.descriptions.root}</p>
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

    if (player.inCombat()) {
        content = <CombatComponent />;
    } else {
        content = <div>{areaArt}</div>;
    }

    return <div className="embedded-sub-component">{content}</div>;
}
