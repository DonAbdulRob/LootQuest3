import create from 'zustand';
import { ConsoleData } from '../WIndowContent/Console/Console';
import Fighter from './Fighter/Fighter';
import CombatState from './Shared/CombatState';

export const __GLOBAL_GAME_STORE = create((set) => ({
    player: new Fighter(true),
    enemy: new Fighter(false),
    combatState: new CombatState(),
    consoleData: new ConsoleData(),
}));
