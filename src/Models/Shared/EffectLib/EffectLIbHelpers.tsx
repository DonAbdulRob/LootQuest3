/**
 * This file contains all of the helper functions for EffectFunctions.tsx
 */

import { ConsoleData } from '../../../WIndowContent/Console/Console';
import Fighter from '../../Fighter/Fighter';

export function activateHealthHealItem(
    player: Fighter,
    inventoryIndex: number,
    consoleData: ConsoleData,
    healAmount: number,
    message: string,
) {
    player.healHealth(healAmount);
    removeItem(player, inventoryIndex);
    consoleData.add(message);
}

export function removeItem(player: Fighter, i: number) {
    player.inventory.items.splice(i, 1);
}
