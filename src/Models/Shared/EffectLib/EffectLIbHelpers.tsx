/**
 * This file contains all of the helper functions for EffectFunctions.tsx
 */

import { RpgConsole } from '../../Singles/RpgConsole';
import Fighter from '../../Fighter/Fighter';
import { Consumable } from '../../Item/Item';

export function activateHealthHealItem(
    fighter: Fighter,
    inventoryIndex: number,
    rpgConsole: RpgConsole,
    healAmount: number,
    message: string,
) {
    fighter.healHealth(healAmount);
    removeUse(fighter, inventoryIndex);
    rpgConsole.add(message);
}

/**
 * Removes a use of an item. Of course, if the item doesn't have any uses (useCount is absent) then the item will be destroyed.
 */
export function removeUse(fighter: Fighter, i: number) {
    let item = fighter.inventory.items[i];

    if (item instanceof Consumable) {
        let useCount = item.useCount;

        // Items with infinite uses return automatically.
        if (item.useCount === -1) {
            return;
        }

        // Reduce uses.
        item.useCount -= 1;

        // We use > 1 rather than >= 1 because '1' is the last use. A non-intuitive concept, but this is how it has to work.
        // Otherwise, we'd have to store uses internally as '0 uses = 1 use left' and display useCount as [useCount + 1] to the player.
        if (useCount > 1) {
            return;
        }
    }

    // Remove item.
    fighter.inventory.items.splice(i, 1);
}
