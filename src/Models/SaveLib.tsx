import { __GLOBAL_REFRESH_FUNC_REF } from '../App';
import { Player } from './Fighter/Player';
import { IRootStore } from './GlobalGameStore';
import { G_MONTHS_ARR, getPaddedToTwoDigits, getPaddedToThreeDigits } from './Helper';
import { Item } from './Item/Item';

export class SaveLib {
    saveFileName: string = '';

    constructor() {
        this.updateSaveFileName();
    }

    updateSaveFileName() {
        this.saveFileName = 'Loot_Quest_' + SaveLib.getNowStr() + '.txt';
    }

    private static getNowStr() {
        let now = new Date();

        return (
            G_MONTHS_ARR[now.getMonth()] +
            '_' +
            getPaddedToTwoDigits(now.getDate()) +
            '_' +
            now.getFullYear() +
            '_' +
            getPaddedToTwoDigits(now.getHours()) +
            '_' +
            getPaddedToTwoDigits(now.getMinutes()) +
            '_' +
            getPaddedToTwoDigits(now.getSeconds()) +
            '_' +
            getPaddedToThreeDigits(now.getMilliseconds())
        );
    }

    static getSaveData(store: IRootStore) {
        let player = store.player;

        // TODO - save statuses.
        // statusContainer: player.statusContainer.getSaveData(),

        let saveObject = {
            player: {
                name: player.name,
                level: player.level,
                experience: player.experience,
                gold: player.gold,
                statBlock: player.statBlock,
                inventory: JSON.stringify(player.inventory),
                equipmentSlots: JSON.stringify(player.equipmentSlots),
                abilities: JSON.stringify(player.abilities),
            },
        };

        return JSON.stringify(saveObject);
    }

    // Protected level method.
    static loadStateFromSave(store: IRootStore, str: string) {
        let obj = JSON.parse(str);
        let objPlayer = obj.player;

        console.log(obj);

        let player = new Player();

        let item1;
        let ele;

        player.name = objPlayer.name;
        player.level = objPlayer.level;
        player.experience = objPlayer.experience;
        player.gold = objPlayer.gold;
        player.statBlock = objPlayer.statBlock;

        player.inventory.items = [];
        let itemsFromJSON = JSON.parse(objPlayer.inventory);
        let inventoryItems = itemsFromJSON.items;

        for (item1 of inventoryItems) {
            player.inventory.items.push(Item.getFromJSON(item1));
        }

        player.equipmentSlots.items = [];
        let equipmentSlotsFromJSON = JSON.parse(objPlayer.equipmentSlots);
        let equipmentItems = equipmentSlotsFromJSON.items;

        for (var i = 0; i < equipmentItems.length; i++) {
            ele = equipmentItems[i];

            if (ele !== null) {
                player.equipmentSlots.items.push(Item.getFromJSON(ele));
            } else {
                player.equipmentSlots.items.push(null);
            }
        }

        store.player = player;
        __GLOBAL_REFRESH_FUNC_REF();
    }
}
