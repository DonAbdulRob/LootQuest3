/**
 * An Inventory is a collection of items.
 */
import { Item, EquipmentType, Equipment } from '../../Item/Item';
import { ItemGen } from '../../Item/ItemGen';
import { Player } from '../Player';

export const G_MAX_INV_SIZE = 20;

export default class Inventory {
    items: Array<Item | Equipment> = [];

    constructor() {
        this.addStarterItems();
    }

    addItem(player: Player, item: Item): boolean {
        if (!this.canFit(1)) {
            return false;
        }

        if (!player.canCarry(item.weight)) {
            return false;
        }

        this.items.push(item);
        return true;
    }

    addItems(player: Player, items: Item[]): boolean {
        let numberOfItems = items.length;

        if (!this.canFit(numberOfItems)) {
            return false;
        }

        if (!player.canCarryAll(items)) {
            return false;
        }

        for (var item of items) {
            this.items.push(item);
        }

        return true;
    }

    private canFit(numberOfItems: number) {
        return this.items.length + numberOfItems <= G_MAX_INV_SIZE;
    }

    clear() {
        this.items = [];
    }

    addStarterItems() {
        let starter1 = new Equipment(
            'Moldy Sword',
            'An old and moldy sword. Is that wood beneath the mold? Or, something else? Who knows...',
            EquipmentType.WEAPON,
            1,
        );
        starter1.statBlock.damageMin = 1;
        starter1.statBlock.damageMax = 1;

        let starter2 = new Equipment(
            'Rusty Sword',
            `A rusted sword. Seems a bit better than the moldy sword, but is it really?`,
            EquipmentType.WEAPON,
            1.5,
        );
        starter2.statBlock.damageMin = 1;
        starter2.statBlock.damageMax = 2;

        let starter3 = new Equipment(
            'Paper Chestplate',
            `A chestplate made from discarded nespaper. It might have been useful if crafted into thick layers by a skilled artison. Unfortunately, it wasn't. Pray that it doesn't rain.`,
            EquipmentType.CHESTPLATE,
            3,
        );
        starter3.statBlock.health = 3;

        let starter4 = new Equipment(
            'Cardboard Chestplate',
            `A chestplate made from torn cardboard boxes. Does offer 'some' protection, but makes you uncomfortable, stiff and a bit itchy. You also smell... urine?`,
            EquipmentType.CHESTPLATE,
            5,
        );
        starter4.statBlock.armor = 1;

        this.items.push(starter1, starter2, starter3, starter4, ItemGen.getOranHerb());
    }
}
