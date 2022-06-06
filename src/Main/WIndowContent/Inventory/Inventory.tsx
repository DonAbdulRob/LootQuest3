import React from "react";
import Fighter from "../../Models/Fighter/Fighter";
import { EquipmentSlotMapping, Item, ItemType } from "../../Models/Fighter/Inventory";
import { refreshRef } from "../../Pages/PlayPage";
import CharacterProps from "../SharedProps/CharacterProps";
import InventoryItem from "./InventoryItem";

function equip(props: CharacterProps, inventorySlot: number) {
    let fighter = props.fighter;
    let invItem: Item = fighter.inventory.items[inventorySlot];
    let invItemType: ItemType = invItem.type;
    let equipItem: Item | null = null;

    switch (invItemType) {
        case ItemType.WEAPON:
            equipItem = fighter.equipment.items[EquipmentSlotMapping.weapon];
            break;
        case ItemType.CHESTPLATE:
            equipItem = fighter.equipment.items[EquipmentSlotMapping.chestplate];
            break;
        default:
            break;
    }

    // If there is an item, move equipment to inventory
    if (equipItem !== null) {
        fighter.inventory.items.push(equipItem);
    }

    // Move inventory item to our equipment slots.
    switch (invItemType) {
        case ItemType.WEAPON:
            fighter.equipment.items[EquipmentSlotMapping.weapon] = invItem;
            break;
        case ItemType.CHESTPLATE:
            fighter.equipment.items[EquipmentSlotMapping.chestplate] = invItem;
            break;
        default:
            break;
    }

    // Remove inventory item from inventory.
    fighter.inventory.items.splice(inventorySlot, 1);
    refreshRef();
}

function drop(props: CharacterProps, inventorySlot: number) {
    let fighter = props.fighter;
    fighter.inventory.items.splice(inventorySlot, 1);
    refreshRef();
}

function clone(props: CharacterProps) {
    let fighter = props.fighter;
    fighter.inventory.items.push(new Item("Wood Sword", ItemType.WEAPON, 10, 10, 0, 0));
    refreshRef();
}

function getInventoryMap(props: CharacterProps): JSX.Element[] {
    let f1: Fighter = props.fighter;

    if (f1.inventory.items.length === 0) {
        return [<div key={0}></div>];
    }

    return f1.inventory.items.map((v, i) => {
        return <div key={i}>
            <div>Slot {i}: <InventoryItem item={f1.inventory.items[i]} /></div>
            <button onClick={() => { equip(props, i)}}>Equip</button>
            <button onClick={() => { drop(props, i)}}>Drop</button>
            <button onClick={() => { clone(props)}}>Add Item to Inventory</button>
        </div>;
    });
}

export default function Inventory(props: CharacterProps): JSX.Element {
    return (
        <div>
            <h1>Inventory</h1>
            {getInventoryMap(props)}
        </div>
    )
}
