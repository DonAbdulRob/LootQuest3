/**
 * This file contains all of the helper functions for EffectFunctions.tsx
 */

import { RpgConsole } from '../../Singles/RpgConsole';
import Fighter from '../../Fighter/Fighter';

export function activateHealthHealItem(
    fighter: Fighter,
    inventoryIndex: number,
    rpgConsole: RpgConsole,
    healAmount: number,
    message: string,
) {
    fighter.healHealth(healAmount);
    removeItem(fighter, inventoryIndex);
    rpgConsole.add(message);
}

export function removeItem(fighter: Fighter, i: number) {
    fighter.inventory.items.splice(i, 1);
}
