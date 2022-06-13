import React from 'react';
import ItemPopup from '../../Components/Popups/ItemPopup';
import { Item } from '../../Models/Item/Item';
import { __GLOBAL_GAME_STORE } from '../../Models/GlobalGameStore';
import { getRandomValueUpTo } from '../../Models/Helper';
import { __GLOBAL_REFRESH_FUNC_REF } from '../../Pages/PlayPage';
import { ItemGen } from '../../Models/Item/ItemGen';
import CombatState from '../../Models/Shared/CombatState';
import { Player } from '../../Models/Fighter/Player';

function generateNewLoot() {
    var loot: Array<Item> = [];
    let lootAmount = getRandomValueUpTo(2) + 1;

    for (var i = 0; i < lootAmount; i++) {
        loot.push(ItemGen.getRandomSword());
    }

    return loot;
}

function getLootDisplay(loot: Array<Item>) {
    return loot.map((v: Item, i: number) => {
        return <ItemPopup prefix="" key={i} item={v} addLootButton={true} />;
    });
}

function endLooting(combatState: CombatState) {
    // Clear loot in combat state.
    combatState.loot = [];

    // Advance combat to next phase (out of combat)
    combatState.advance();

    // Disable the loot lock.
    combatState.disableLootLock();

    // Refresh screen.
    __GLOBAL_REFRESH_FUNC_REF();
}

export default function LootTransition() {
    let combatState: CombatState = __GLOBAL_GAME_STORE((__DATA: any) => __DATA.combatState);
    let player: Player = __GLOBAL_GAME_STORE((__DATA: any) => __DATA.player);
    let loot = combatState.loot;

    if (!combatState.generateLootLock) {
        combatState.loot = generateNewLoot();
        combatState.enableLootLock();
    }

    return (
        <div>
            <h1>Loot!</h1>
            {getLootDisplay(loot)}
            <hr />
            <button
                onClick={() => {
                    // Add all items to inventory.
                    for (var item of loot) {
                        player.addItemToInventory(item);
                    }
                    // End looting.
                    endLooting(combatState);

                    // Refresh screen.
                    __GLOBAL_REFRESH_FUNC_REF();
                }}
            >
                Loot All & Exit
            </button>
            <button
                onClick={() => {
                    endLooting(combatState);
                }}
            >
                Exit Looting
            </button>
        </div>
    );
}
