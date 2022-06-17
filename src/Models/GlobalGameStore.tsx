import create from 'zustand';
import { ConsoleData } from '../WIndowContent/Console/ConsoleComponent';
import { Player } from './Fighter/Player';
import { Monster } from './Fighter/Monster';
import CombatState from './Shared/CombatState';
import WindowStateManager from './Singles/WindowStateManager';
import produce from 'immer';
import GameStateManager from './Singles/GameStateManager';

export interface GlobalGameStore {
    player: Player;
    enemy: Monster;
    combatState: CombatState;
    consoleData: ConsoleData;
    windowStateManager: WindowStateManager;
    gameStateManager: GameStateManager;
}

function getGameStore() {
    return create<GlobalGameStore>((set) => ({
        player: new Player(),
        enemy: new Monster(),
        combatState: new CombatState(),
        consoleData: new ConsoleData(),
        windowStateManager: new WindowStateManager(),
        gameStateManager: new GameStateManager(),

        setPlayerName: (x: string) =>
            set(
                produce((state: any) => {
                    state.player.name = x;
                }),
            ),
    }));
}

export function G_RESET_GAME_STORE() {
    __GLOBAL_GAME_STORE = getGameStore();
}

export let __GLOBAL_GAME_STORE = getGameStore();
