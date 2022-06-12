import React from 'react';
import Fighter from '../../Models/Fighter/Fighter';
import { EquipmentSlotMapping } from '../../Models/Fighter/Inventory';
import { Equipment, Item } from '../../Models/Fighter/Item';
import { __GLOBAL_GAME_STORE } from '../../Models/GlobalGameStore';
import { removeElement } from '../../Models/Helper';
import { __GLOBAL_REFRESH_FUNC_REF } from '../../Pages/PlayPage';
import './ItemPopup.css';

interface ItemPopupProps {
    prefix: string;
    item: Item | null;
    addLootButton: boolean;
}

function capitalizeFirstLetter(str: string) {
    const arr = str.split('');
    arr[0] = arr[0].toLocaleUpperCase();
    return arr.join('');
}

function getDiffPrefix(diff: number): JSX.Element {
    if (diff < 0) {
        return <span className="red">{diff}</span>;
    } else if (diff > 0) {
        return <span className="green">{'+' + diff}</span>;
    } else {
        return <span>{diff}</span>;
    }
}

function getDiff(fighter: Fighter, item: any, field: any) {
    let val;
    let equipmentItem: any;

    if (item.type === 0) {
        equipmentItem =
            fighter.equipmentSlots.items[EquipmentSlotMapping.weapon];
    } else {
        equipmentItem =
            fighter.equipmentSlots.items[EquipmentSlotMapping.chestplate];
    }

    if (equipmentItem !== null && equipmentItem !== undefined) {
        val = equipmentItem[field];
        return item[field] - val;
    }

    return 0;
}

function getFieldDisplay(fighter: Fighter, item: any, field: any) {
    let diff = getDiff(fighter, item, field);
    let diffDisplay = null;

    if (diff !== 0) {
        diffDisplay = (
            <span>
                {', ['}
                {getDiffPrefix(diff)}
                {']'}
            </span>
        );
    }

    return (item[field] !== '' && item[field] !== 0) || diff != null ? (
        <p className="item-description">
            Bonus {capitalizeFirstLetter(field)}: {item[field]}
            {diffDisplay}
        </p>
    ) : null;
}

function getDamageDisplay(fighter: Fighter, item: Equipment) {
    let diff1 = getDiff(fighter, item, 'minDamage');
    let diff2 = getDiff(fighter, item, 'maxDamage');
    let diffDisplay = null;

    if (diff1 !== 0 || diff2 !== 0) {
        diffDisplay = (
            <span>
                {', ['}
                {getDiffPrefix(diff1)}
                {' / '}
                {getDiffPrefix(diff2)}
                {']'}
            </span>
        );
    }

    return item.minDamage !== 0 ||
        item.maxDamage !== 0 ||
        diffDisplay !== null ? (
        <p className="item-description">
            Bonus Damage: {item.minDamage} - {item.maxDamage}
            {diffDisplay}
        </p>
    ) : null;
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
    let statDisplay = null;

    if (item instanceof Equipment) {
        statDisplay = (
            <span>
                {getDamageDisplay(player, item)}
                {getFieldDisplay(player, item, 'health')}
                {getFieldDisplay(player, item, 'armor')}
            </span>
        );
    }
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
                    {statDisplay}
                </span>
            </div>
        );
    }
}
