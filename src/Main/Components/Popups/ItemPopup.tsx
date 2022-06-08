import React from 'react';
import { Item } from '../../Models/Fighter/Item';
import { __GLOBAL_GAME_STORE } from '../../Models/GlobalGameStore';
import { removeElement } from '../../Models/Helper';
import { __GLOBAL_REFRESH_FUNC_REF } from '../../Pages/PlayPage';
import './ItemPopup.css';

interface ItemPopupProps {
    item: Item;
    addLootButton: boolean;
}

export default function ItemPopup(props: ItemPopupProps) {
    let player = __GLOBAL_GAME_STORE((__DATA: any) => __DATA.player);
    let combatState = __GLOBAL_GAME_STORE((__DATA: any) => __DATA.combatState);
    let lootButton = null;

    if (props.addLootButton) {
        lootButton = (
            <button
                onClick={() => {
                    player.addItemToInventory(props.item);
                    combatState.loot = removeElement(
                        combatState.loot,
                        props.item,
                    );
                    __GLOBAL_REFRESH_FUNC_REF();
                }}
            >
                Loot
            </button>
        );
    }

    return (
        <div className="tooltip">
            <div>{props.item.name}</div>
            {lootButton}
            <span className="tooltiptext">
                <p>This is a tooltip example.</p>
            </span>
        </div>
    );
}
