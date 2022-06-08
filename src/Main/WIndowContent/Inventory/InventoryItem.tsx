import React from 'react';
import ItemPopup from '../../Components/Popups/ItemPopup';
import ItemProp from '../SharedProps/ItemProp';

export default function InventoryItem(props: ItemProp) {
    if (props.item == null) {
        return <div>[NO ITEM]</div>;
    }

    return <ItemPopup item={props.item} addLootButton={false} />;
}
