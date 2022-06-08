import React from 'react';
import ItemPopup from '../../Components/Popups/ItemPopup';
import { Item, ItemGen } from '../../Models/Fighter/Item';
import { __GLOBAL_GAME_STORE } from '../../Models/GlobalGameStore';
import { __GLOBAL_REFRESH_FUNC_REF } from '../../Pages/PlayPage';

function generateNewLoot() {
    var loot: Array<Item> = [];
    let lootAmount = Math.random() * 10 + 2;

    for (var i = 0; i < lootAmount; i++) {
        loot.push(ItemGen.getRandomSword());
    }

    return loot;
}

function getLootDisplay(loot: Array<Item>) {
    return loot.map((v: Item, i: number) => {
        return <ItemPopup key={i} item={v} />;
    });
}

export default function LootTransition() {
    let combatState = __GLOBAL_GAME_STORE((__DATA: any) => __DATA.combatState);
    let loot = combatState.loot;

    if (!combatState.generateLootLock) {
        combatState.loot = generateNewLoot();
        combatState.enableLootLock();
    }

    return (
        <div>
            <h1>Loot!</h1>
            <hr />
            {getLootDisplay(loot)}
            <hr />
            <button
                onClick={() => {
                    combatState.advance();
                    combatState.disableLootLock();
                    __GLOBAL_REFRESH_FUNC_REF();
                }}
            >
                End Looting
            </button>
        </div>
    );
}
