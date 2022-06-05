import React from "react";
import ItemProp from "../SharedProps/ItemProp";

function attemptEquip() {

}

function deleteItem() {

}

export default function InventoryItem(props: ItemProp) {
    if (props.item == null) {
        return <p>[NO ITEM]</p>;
    }
    
    return <p>{props.item.name}</p>;
}