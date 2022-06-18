import React from 'react';
import ItemPopup from '../../../Components/Popups/ItemPopup';
import { Item } from '../../../Models/Item/Item';
import { IRootStore, __GLOBAL_GAME_STORE } from '../../../Models/GlobalGameStore';
import { __GLOBAL_REFRESH_FUNC_REF } from '../../../Pages/PlayPage';

function getLootDisplay(loot: Array<Item>) {
    return loot.map((v: Item, i: number) => {
        return <ItemPopup prefix="" key={i} item={v} addLootButton={true} />;
    });
}

function endLooting(store: IRootStore) {
    // Clear loot in combat state.
    store.combatState.loot = [];

    // Advance combat to next phase (out of combat)
    store.player.setCombatOver();

    // Refresh screen.
    __GLOBAL_REFRESH_FUNC_REF();
}

export default function LootTransitionComponent() {
    let store: IRootStore = __GLOBAL_GAME_STORE((__DATA) => __DATA);
    let player = store.player;
    let consoleData = store.consoleData;
    let combatState = store.combatState;

    let loot = combatState.loot;

    return (
        <div>
            <h1>Loot!</h1>
            {getLootDisplay(loot)}
            <hr />
            <button
                onClick={() => {
                    // Add all items to inventory.
                    let res = player.inventory.addItems(loot);

                    if (res) {
                        endLooting(store);
                    } else {
                        consoleData.add('Unable to loot all. Not enough inventory space.');
                    }

                    // Refresh screen.
                    __GLOBAL_REFRESH_FUNC_REF();
                }}
            >
                Loot All & Exit
            </button>
            <button
                onClick={() => {
                    endLooting(store);
                }}
            >
                Exit Looting
            </button>
        </div>
    );
}
