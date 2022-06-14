import { getRandomValueUpTo } from '../Helper';
import { Item } from '../Item/Item';
import { ItemGen } from '../Item/ItemGen';

export default class CombatState {
    round: number = 0;
    loot: Array<Item> = [];
    generateLootLock: boolean = false;

    generateNewLoot() {
        this.loot = [];
        let lootRolls = getRandomValueUpTo(100);
        let lootAmount = 0;

        if (lootRolls >= 50) {
            lootAmount = 1;
        } else if (lootRolls >= 75) {
            lootRolls = 2;
        } else if (lootRolls >= 90) {
            lootRolls = 3;
        }

        let type;

        for (var i = 0; i < lootAmount; i++) {
            type = getRandomValueUpTo(1);

            if (type === 0) {
                this.loot.push(ItemGen.getRandomSword());
            } else if (type === 1) {
                this.loot.push(ItemGen.getOranHerb());
            }
        }
    }
}
