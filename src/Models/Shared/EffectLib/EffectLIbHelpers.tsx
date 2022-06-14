/**
 * This file contains all of the helper functions for EffectFunctions.tsx
 */

import { ConsoleData } from '../../../WIndowContent/Console/ConsoleComponent';
import { Fighter } from '../../Fighter/Fighter';

export function activateHealthHealItem(
    fighter: Fighter,
    inventoryIndex: number,
    consoleData: ConsoleData,
    healAmount: number,
    message: string,
) {
    fighter.healHealth(healAmount);
    removeItem(fighter, inventoryIndex);
    consoleData.add(message);
}

export function removeItem(fighter: Fighter, i: number) {
    fighter.inventory.items.splice(i, 1);
}
