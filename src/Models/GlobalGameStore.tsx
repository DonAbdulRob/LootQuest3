import create, { GetState, SetState } from 'zustand';
import { ConsoleData } from '../WIndowContent/Console/ConsoleComponent';
import { Monster } from './Fighter/Monster';
import CombatState from './Shared/CombatState';
import WindowStateManager from './Singles/WindowStateManager';
import GameStateManager from './Singles/GameStateManager';
import { createPlayerSlice, IPlayerSlice } from './Slices/PlayerSlice';
import { StoreSlice } from './Slices/StoreSlice';
import { IPageSlice, createPageSlice } from './Slices/PageSlice';

export interface IGlobals {
    enemy: Monster;
    combatState: CombatState;
    consoleData: ConsoleData;
    windowStateManager: WindowStateManager;
    gameStateManager: GameStateManager;
}

const createGlobalSlice: StoreSlice<IGlobals> = (set, get) => ({
    enemy: new Monster(),
    combatState: new CombatState(),
    consoleData: new ConsoleData(),
    windowStateManager: new WindowStateManager(),
    gameStateManager: new GameStateManager(),
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
