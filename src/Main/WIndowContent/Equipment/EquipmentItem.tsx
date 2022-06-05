import React from "react";
import ItemProp from "../SharedProps/ItemProp";

export default function InventoryItem(props: ItemProp) {
    if (props.item == null) {
        return <div>[NO ITEM]</div>;
    }
    
    return <div>{props.item.name}</div>;
}