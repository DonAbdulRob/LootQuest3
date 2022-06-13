import create from 'zustand';
import { ConsoleData } from '../WIndowContent/Console/Console';
import { Player } from './Fighter/Player';
import { Monster } from './Fighter/Monster';
import CombatState from './Shared/CombatState';
import WindowStateManager from './Singles/WindowStateManager';

export const __GLOBAL_GAME_STORE = create((set) => ({
    player: new Player(),
    enemy: new Monster(),
    combatState: new CombatState(),
    consoleData: new ConsoleData(),
    windowStateManager: new WindowStateManager(),
}));
