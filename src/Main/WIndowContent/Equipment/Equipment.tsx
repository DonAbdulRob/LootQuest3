import React from "react";
import Fighter from "../../Models/Fighter/Fighter";
import { Item, ItemType, EquipmentSlotMapping } from "../../Models/Fighter/Inventory";
import { __GLOBAL_GAME_STORE } from "../../Models/GlobalGameStore";
import { __GLOBAL_REFRESH_FUNC_REF } from "../../Pages/PlayPage";
import CharacterProps from "../SharedProps/CharacterProps";
import EquipmentItem from "./EquipmentItem";

function unequip(fighter: Fighter, inventorySlot: number) {
    let invItem: Item | null = fighter.equipment.items[inventorySlot];

    // Add equipment item to inventory.
    if (invItem !== null) {
        fighter.inventory.items.push(invItem);
        
        // Clear out equipment slot.
        switch (invItem.type) {
            case ItemType.WEAPON:
                fighter.equipment.items[EquipmentSlotMapping.weapon] = null;
                break;
            case ItemType.CHESTPLATE:
                fighter.equipment.items[EquipmentSlotMapping.chestplate] = null;
                break;
            default:
                break;
        }
    }
    
    __GLOBAL_REFRESH_FUNC_REF();
}

function getEquipmentMap(fighter: Fighter): JSX.Element[] {
    if (fighter.equipment.items.length === 0) {
        return [<div key={0}></div>];
    }

    return fighter.equipment.items.map((v, i) => {
        return <div key={i}>
            <div>Slot {i}: <EquipmentItem item={fighter.equipment.items[i]} /></div>
            <button onClick={() => { unequip(fighter, i)}}>Unequip</button>
        </div>;
    });
}

export default function Equipment(props: CharacterProps): JSX.Element {
    const store: any = __GLOBAL_GAME_STORE((__DATA) => __DATA);
    let fighter;

    if ((props.usePlayer)) {
        fighter = store.player;
    } else {
        fighter = store.enemy;
    }

    return (
        <div>
            <h1>Equipment</h1>
            {getEquipmentMap(fighter)}
        </div>
    )
}
