import React from "react";
import Fighter from "../../Models/Fighter/Fighter";
import { Item, ItemType, EquipmentSlotMapping } from "../../Models/Fighter/Inventory";
import CharacterProps from "../SharedProps/CharacterProps";
import EquipmentItem from "./EquipmentItem";

function unequip(props: CharacterProps, inventorySlot: number) {
    let fighter = props.fighter;
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

    props.setFighter((oldFighter: Fighter) => {
        fighter = {...oldFighter};
        return fighter;
    });
}


function getEquipmentMap(props: CharacterProps): JSX.Element[] {
    let fighter: Fighter = props.fighter;

    if (fighter.equipment.items.length === 0) {
        return [<div key={0}></div>];
    }

    return fighter.equipment.items.map((v, i) => {
        return <div key={i}>
            <div>Slot {i}: <EquipmentItem item={fighter.equipment.items[i]} /></div>
            <button onClick={() => { unequip(props, i)}}>Unequip</button>
        </div>;
    });
}

export default function Equipment(props: CharacterProps): JSX.Element {
    return (
        <div>
            <h1>Equipment</h1>
            {getEquipmentMap(props)}
        </div>
    )
}
