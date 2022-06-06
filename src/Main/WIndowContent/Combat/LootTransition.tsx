import React from "react";
import Fighter from "../../Models/Fighter/Fighter";
import { Item, ItemGen } from "../../Models/Fighter/Inventory";
import CombatState from "../../Models/Shared/CombatState";
import { __GLOBAL_REFRESH_FUNC_REF } from "../../Pages/PlayPage";

function getRandomLoot() {
    let loot = [];

    for (var i = 0; i < 10; i++) {
        loot.push(ItemGen.getRandomSword());
    }

    return loot;
}


function getLootDisplay(loot: Array<Item>) {
    return <div></div>
}

interface LootProps {
    player: Fighter;
    setPlayer: Function;
    enemy: Fighter;
    combatState: CombatState;
}

export default function LootTransition(props: LootProps) {
    let loot: Array<Item> = getRandomLoot();
    
    return <div>
        <h1>Loot!</h1>
        <hr />
        {getLootDisplay(loot)}
        <hr />
        <button onClick={() => {
            props.combatState.advance();
            __GLOBAL_REFRESH_FUNC_REF();
        }}>End Looting</button>
    </div>;
}
