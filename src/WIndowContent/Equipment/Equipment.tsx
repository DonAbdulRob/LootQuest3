import React from 'react';
import ItemPopup from '../../Components/Popups/ItemPopup';
import Fighter from '../../Models/Fighter/Fighter';
import { EquipmentSlotMapping } from '../../Models/Fighter/Inventory';
import { Item, EquipmentType } from '../../Models/Fighter/Item';
import { __GLOBAL_GAME_STORE } from '../../Models/GlobalGameStore';
import { __GLOBAL_REFRESH_FUNC_REF } from '../../Pages/PlayPage';
import CharacterProps from '../SharedProps/CharacterProps';

function unequip(fighter: Fighter, inventorySlot: number) {
    let invItem = fighter.equipmentSlots.items[inventorySlot];

    // Add equipment item to inventory.
    if (invItem !== null) {
        fighter.inventory.items.push(invItem);

        // Clear out equipment slot.
        switch (invItem.equipmentType) {
            case EquipmentType.WEAPON:
                fighter.equipmentSlots.items[EquipmentSlotMapping.weapon] =
                    null;
                break;
            case EquipmentType.CHESTPLATE:
                fighter.equipmentSlots.items[EquipmentSlotMapping.chestplate] =
                    null;
                break;
            default:
                break;
        }
    }

    __GLOBAL_REFRESH_FUNC_REF();
}

function getEquipmentMap(fighter: Fighter): JSX.Element[] {
    if (fighter.equipmentSlots.items.length === 0) {
        return [<div key={0}></div>];
    }

    let keys = Object.keys(EquipmentType);
    let finalKeys: Array<string> = [];

    for (var i = Math.floor(keys.length / 2); i < keys.length; i++) {
        finalKeys.push(keys[i]);
    }

    let item;
    let button;

    return fighter.equipmentSlots.items.map((v, i) => {
        item = fighter.equipmentSlots.items[i];

        if (item != null) {
            button = (
                <button
                    onClick={() => {
                        unequip(fighter, i);
                    }}
                >
                    Unequip
                </button>
            );
        } else {
            button = null;
        }

        return (
            <div className="equipment-list" key={i}>
                <ItemPopup
                    prefix={finalKeys[i] + ': '}
                    item={item}
                    addLootButton={false}
                />
                {button}
            </div>
        );
    });
}

export default function Equipment(props: CharacterProps): JSX.Element {
    const store: any = __GLOBAL_GAME_STORE((__DATA) => __DATA);
    let fighter;

    if (props.usePlayer) {
        fighter = store.player;
    } else {
        fighter = store.enemy;
    }

    return (
        <div className="window-core">
            <h1>Equipment</h1>
            {getEquipmentMap(fighter)}
        </div>
    );
}
