import React from 'react';
import ItemPopup from '../../../Components/Popups/ItemPopup';
import { Item } from '../../../Models/Item/Item';
import { __GLOBAL_GAME_STORE } from '../../../Models/GlobalGameStore';
import { __GLOBAL_REFRESH_FUNC_REF } from '../../../Pages/PlayPage';
import CombatState from '../../../Models/Shared/CombatState';
import { Player } from '../../../Models/Fighter/Player';

function getLootDisplay(loot: Array<Item>) {
    return loot.map((v: Item, i: number) => {
        return <ItemPopup prefix="" key={i} item={v} addLootButton={true} />;
    });
}

function endLooting(player: Player, combatState: CombatState) {
    // Clear loot in combat state.
    combatState.loot = [];

    // Advance combat to next phase (out of combat)
    player.setCombatOver();

    // Refresh screen.
    __GLOBAL_REFRESH_FUNC_REF();
}

export default function LootTransitionComponent() {
    let combatState: CombatState = __GLOBAL_GAME_STORE((__DATA: any) => __DATA.combatState);
    let player: Player = __GLOBAL_GAME_STORE((__DATA: any) => __DATA.player);
    let loot = combatState.loot;

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
                    endLooting(player, combatState);

                    // Refresh screen.
                    __GLOBAL_REFRESH_FUNC_REF();
                }}
            >
                Loot All & Exit
            </button>
            <button
                onClick={() => {
                    endLooting(player, combatState);
                }}
            >
                Exit Looting
            </button>
        </div>
    );
}
