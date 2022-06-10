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

    let item = props.item;

    return (
        <div className="tooltip">
            <div>{item.name}</div>
            {lootButton}
            <span className="tooltiptext">
                <p>{item.name}</p>
                <p>{item.description}</p>
                <p>
                    Bonus Damage: {item.minDamage} - {item.maxDamage}
                </p>
                <p>Bonus Health: {item.health}</p>
                <p>Bonus Armor: {item.armor}</p>
            </span>
        </div>
    );
}
