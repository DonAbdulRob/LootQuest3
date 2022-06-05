import React from "react";
import ItemProp from "../SharedProps/ItemProp";

/**
function attemptEquip() {

}

function deleteItem() {

}
 */

export default function InventoryItem(props: ItemProp) {
    if (props.item == null) {
        return <div>[NO ITEM]</div>;
    }
    
    return <div>{props.item.name}</div>;
}