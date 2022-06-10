import React from 'react';
import ItemPopup from '../../Components/Popups/ItemPopup';
import Fighter from '../../Models/Fighter/Fighter';
import { EquipmentSlotMapping } from '../../Models/Fighter/Inventory';
import { Item, ItemType } from '../../Models/Fighter/Item';
import { __GLOBAL_GAME_STORE } from '../../Models/GlobalGameStore';
import { __GLOBAL_REFRESH_FUNC_REF } from '../../Pages/PlayPage';
import CharacterProps from '../SharedProps/CharacterProps';

function equip(fighter: Fighter, inventorySlot: number) {
    let invItem: Item = fighter.inventory.items[inventorySlot];
    let invItemType: ItemType = invItem.type;
    let equipItem: Item | null = null;

    switch (invItemType) {
        case ItemType.WEAPON:
            equipItem = fighter.equipment.items[EquipmentSlotMapping.weapon];
            break;
        case ItemType.CHESTPLATE:
            equipItem =
                fighter.equipment.items[EquipmentSlotMapping.chestplate];
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
        case ItemType.WEAPON:
            fighter.equipment.items[EquipmentSlotMapping.weapon] = invItem;
            break;
        case ItemType.CHESTPLATE:
            fighter.equipment.items[EquipmentSlotMapping.chestplate] = invItem;
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

function clone(fighter: Fighter) {
    fighter.addItemToInventory(
        new Item(
            'Wood Sword',
            'A cloned wooden sword.',
            ItemType.WEAPON,
            10,
            10,
            0,
            0,
        ),
    );
    __GLOBAL_REFRESH_FUNC_REF();
}

function getInventoryMap(fighter: Fighter): JSX.Element[] {
    if (fighter.inventory.items.length === 0) {
        return [<div key={0}></div>];
    }

    return fighter.inventory.items.map((v, i) => {
        return (
            <div key={i}>
                <ItemPopup
                    prefix=""
                    item={fighter.inventory.items[i]}
                    addLootButton={false}
                />
                <button
                    onClick={() => {
                        equip(fighter, i);
                    }}
                >
                    Equip
                </button>
                <button
                    onClick={() => {
                        drop(fighter, i);
                    }}
                >
                    Drop
                </button>
                <button
                    onClick={() => {
                        clone(fighter);
                    }}
                >
                    Add Item to Inventory
                </button>
            </div>
        );
    });
}

export default function Inventory(props: CharacterProps): JSX.Element {
    const store: any = __GLOBAL_GAME_STORE((__DATA) => __DATA);
    let fighter;

    if (props.usePlayer) {
        fighter = store.player;
    } else {
        fighter = store.enemy;
    }

    return (
        <div className="window-core">
            <h1>Inventory</h1>
            {getInventoryMap(fighter)}
        </div>
    );
}
