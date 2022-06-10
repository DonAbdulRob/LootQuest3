import React from 'react';
import { Item } from '../../Models/Fighter/Item';
import { __GLOBAL_GAME_STORE } from '../../Models/GlobalGameStore';
import { removeElement } from '../../Models/Helper';
import { __GLOBAL_REFRESH_FUNC_REF } from '../../Pages/PlayPage';
import './ItemPopup.css';

interface ItemPopupProps {
    prefix: string;
    item: Item | null;
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

    if (item === null) {
        return (
            <div className="tooltip">
                <p>{props.prefix + ' '}None</p>
            </div>
        );
    } else {
        return (
            <div className="tooltip">
                <div>
                    {props.prefix + item.name} {lootButton}
                </div>
                <span className="tooltiptext">
                    <p className="item-name">{item.name}</p>
                    <p className="item-description">{item.description}</p>
                    <p className="item-stats">
                        Bonus Damage: {item.minDamage} - {item.maxDamage}
                    </p>
                    <p className="item-stats">Bonus Health: {item.health}</p>
                    <p className="item-stats">Bonus Armor: {item.armor}</p>
                </span>
            </div>
        );
    }
}
