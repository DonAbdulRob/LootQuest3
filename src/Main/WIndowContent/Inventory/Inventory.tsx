import React from "react";
import CharacterProps from "../SharedProps/CharacterProps";
import InventoryItem from "./InventoryItem";

export default function Inventory(props: CharacterProps): JSX.Element {
    let f1 = props.fighter;

    return (
        <div>
            <h1>Inventory</h1>
            <InventoryItem item={f1.inventory.items[0]} />
        </div>
    )
}