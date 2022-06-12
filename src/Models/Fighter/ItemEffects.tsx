import { ConsoleData } from '../../WIndowContent/Console/Console';
import Fighter from './Fighter';

export const EFFECT_ID_ORAN_HERB = 0;

export function CONSUMABLE_EFFECT_FUNCTION(id: number) {
    switch (id) {
        case EFFECT_ID_ORAN_HERB:
            return oran_herb;
        default:
            return null;
    }
}

function oran_herb(
    player: Fighter,
    inventoryIndex: number,
    consoleData: ConsoleData,
) {
    player.healHealth(1);
    removeItem(player, inventoryIndex);
    consoleData.add(
        'You apply the Oran Herb and feel a bit healthier. (+1 Healing).',
    );
}

function removeItem(player: Fighter, i: number) {
    player.inventory.items.splice(i, 1);
}
