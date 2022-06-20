/**
 * The Global Game Store is our one store for holding game information in accordance with the Zustand library's specifications.
 */
import create, { GetState, SetState } from 'zustand';
import { RpgConsole } from './Singles/RpgConsole';
import { Monster } from './Fighter/Monster';
import CombatState from './Shared/CombatState';
import WindowStateManager from './Singles/WindowStateManager';
import GameStateManager from './Singles/GameStateManager';
import { createPlayerSlice, IPlayerSlice } from './Slices/PlayerSlice';
import { StoreSlice } from './Slices/StoreSlice';
import { IPageSlice, createPageSlice } from './Slices/PageSlice';
import { SaveLib } from './SaveLib';

export interface IGlobals {
    enemy: Monster;
    combatState: CombatState;
    rpgConsole: RpgConsole;
    windowStateManager: WindowStateManager;
    gameStateManager: GameStateManager;
    saveLib: SaveLib;
}

const createGlobalSlice: StoreSlice<IGlobals> = (set, get) => ({
    enemy: new Monster(),
    combatState: new CombatState(),
    rpgConsole: new RpgConsole(),
    windowStateManager: new WindowStateManager(),
    gameStateManager: new GameStateManager(),
    saveLib: new SaveLib(),
});

export interface IRootStore extends IGlobals, IPlayerSlice, IPageSlice {}

const createRootSlice = (set: SetState<any>, get: GetState<any>) => ({
    ...createGlobalSlice(set, get),
    ...createPlayerSlice(set, get),
    ...createPageSlice(set, get),
});

export function G_RESET_GAME_STORE() {
    __GLOBAL_GAME_STORE = create(createRootSlice);
}

export let __GLOBAL_GAME_STORE = create(createRootSlice);
