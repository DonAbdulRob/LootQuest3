import React from 'react';
import ItemPopup from '../../Components/Popups/ItemPopup';
import Fighter from '../../Models/Fighter/Fighter';
import {
    Item,
    EquipmentType,
    ItemType,
    Equipment,
    Consumable,
} from '../../Models/Item/Item';
import { CONSUMABLE_EFFECT_FUNCTION } from '../../Models/Item/ItemEffectToCoreEffectMapper';
import { __GLOBAL_GAME_STORE } from '../../Models/GlobalGameStore';
import { __GLOBAL_REFRESH_FUNC_REF } from '../../Pages/PlayPage';
import { ConsoleData } from '../Console/Console';
import CharacterProps from '../SharedProps/CharacterProps';
import { EquipmentSlotMapping } from '../../Models/Item/EquipmentSlots';

function equip(fighter: Fighter, inventorySlot: number) {
    let invItem: Equipment | Item = fighter.inventory.items[inventorySlot];

    if (!(invItem instanceof Equipment)) {
        console.log('Dev error. Trying to equip non-equip: ' + invItem.name);
        return;
    }

    let invItemType: EquipmentType = invItem.equipmentType;
    let equipItem: Item | null = null;

    switch (invItemType) {
        case EquipmentType.WEAPON:
            equipItem =
                fighter.equipmentSlots.items[EquipmentSlotMapping.weapon];
            break;
        case EquipmentType.CHESTPLATE:
            equipItem =
                fighter.equipmentSlots.items[EquipmentSlotMapping.chestplate];
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
        case EquipmentType.WEAPON:
            fighter.equipmentSlots.items[EquipmentSlotMapping.weapon] = invItem;
            break;
        case EquipmentType.CHESTPLATE:
            fighter.equipmentSlots.items[EquipmentSlotMapping.chestplate] =
                invItem;
            break;
        default:
            break;
    }

    // Remove inventory item from inventory.
    fighter.inventory.items.splice(inventorySlot, 1);
    __GLOBAL_REFRESH_FUNC_REF();
}

function drop(fighter: Fighter, inventorySlot: number) {
    fighter.inventory.items.splice(inventorySlot, 1);
    __GLOBAL_REFRESH_FUNC_REF();
}

function getInventoryMap(
    fighter: Fighter,
    consoleData: ConsoleData,
): JSX.Element[] {
    if (fighter.inventory.items.length === 0) {
        return [<div key={0}></div>];
    }

    return fighter.inventory.items.map((v, i) => {
        let useButton = null;
        let equipButton = null;

        if (v.itemType === ItemType.CONSUMABLE) {
            useButton = (
                <button
                    onClick={() => {
                        let func = CONSUMABLE_EFFECT_FUNCTION(
                            (v as Consumable).useFunctionId,
                        );

                        if (func != null) {
                            func(fighter, i, consoleData);
                            __GLOBAL_REFRESH_FUNC_REF();
                        }
                    }}
                >
                    Use
                </button>
            );
        }

        if (v.itemType === ItemType.EQUIPMENT) {
            equipButton = (
                <button
                    onClick={() => {
                        equip(fighter, i);
                    }}
                >
                    Equip
                </button>
            );
        }

        return (
            <div key={i}>
                <ItemPopup
                    prefix=""
                    item={fighter.inventory.items[i]}
                    addLootButton={false}
                />
                {useButton}
                {equipButton}
                <button
                    onClick={() => {
                        drop(fighter, i);
                    }}
                >
                    Drop
                </button>
            </div>
        );
    });
}

export default function Inventory(props: CharacterProps): JSX.Element {
    const store: any = __GLOBAL_GAME_STORE((__DATA) => __DATA);
    let consoleData = __GLOBAL_GAME_STORE((__DATA: any) => __DATA.consoleData);
    let fighter;

    if (props.usePlayer) {
        fighter = store.player;
    } else {
        fighter = store.enemy;
    }

    return (
        <div className="window-core">
            <h1>Inventory</h1>
            {getInventoryMap(fighter, consoleData)}
        </div>
    );
}
