import React from 'react';
import ItemPopup from '../../Components/Popups/ItemPopup';
import { Item } from '../../Models/Item/Item';
import { __GLOBAL_GAME_STORE } from '../../Models/GlobalGameStore';
import { getRandomValueUpTo } from '../../Models/Helper';
import { __GLOBAL_REFRESH_FUNC_REF } from '../../Pages/PlayPage';
import { ItemGen } from '../../Models/Item/ItemGen';

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
