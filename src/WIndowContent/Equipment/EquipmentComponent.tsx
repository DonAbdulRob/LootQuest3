import React from 'react';
import ItemPopup from '../../Components/Popups/ItemPopup';
import { EquipmentType } from '../../Models/Item/Item';
import { IRootStore, __GLOBAL_GAME_STORE } from '../../Models/GlobalGameStore';
import { __GLOBAL_REFRESH_FUNC_REF } from '../../App';
import { EquipmentSlotMapping } from '../../Models/Fighter/Storage/EquipmentSlots';
import { PlayerAbilityEffectLib } from '../../Models/Shared/EffectLib/PlayerAbilityEffectLib';

function unequip(store: IRootStore, inventorySlot: number) {
    let player = store.player;
    let invItem = player.equipmentSlots.items[inventorySlot];

    // Add equipment item to inventory.
    if (invItem !== null) {
        let res = player.inventory.addItem(player, invItem);

        if (!res) {
            store.rpgConsole.addItemFail(invItem.name);
            __GLOBAL_REFRESH_FUNC_REF();
            return;
        }

        // Clear out equipment slot.
        switch (invItem.equipmentType) {
            case EquipmentType.WEAPON:
                player.equipmentSlots.items[EquipmentSlotMapping.weapon] = null;
                break;
            case EquipmentType.CHESTPLATE:
                player.equipmentSlots.items[EquipmentSlotMapping.chestplate] = null;
                break;
            default:
                break;
        }

        // Do equip 'effect'.
        PlayerAbilityEffectLib.equip(store);
    }

    __GLOBAL_REFRESH_FUNC_REF();
}

function getEquipmentMap(store: IRootStore): JSX.Element[] {
    let player = store.player;

    if (player.equipmentSlots.items.length === 0) {
        return [<div key={0}></div>];
    }

    let keys = Object.keys(EquipmentType);
    let finalKeys: Array<string> = [];

    for (var i = Math.floor(keys.length / 2); i < keys.length; i++) {
        finalKeys.push(keys[i]);
    }

    let item;
    let button;

    return player.equipmentSlots.items.map((v, i) => {
        item = player.equipmentSlots.items[i];

        if (item != null) {
            button = (
                <button
                    onClick={() => {
                        unequip(store, i);
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
                <ItemPopup prefix={finalKeys[i] + ': '} item={item} addLootButton={false} />
                {button}
            </div>
        );
    });
}

export default function EquipmentComponent(): JSX.Element {
    const store: any = __GLOBAL_GAME_STORE((__DATA) => __DATA);

    return (
        <div className="window-core">
            <h1>Equipment</h1>
            {getEquipmentMap(store)}
        </div>
    );
}
