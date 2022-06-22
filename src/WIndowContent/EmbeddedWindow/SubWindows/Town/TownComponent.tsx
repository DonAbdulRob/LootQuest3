/**
 * The 'Town Component' displays generic towns.
 */
import React from 'react';
import { __GLOBAL_REFRESH_FUNC_REF } from '../../../../App';
import { TownDescription } from '../../../../Models/Area/TownDescription';
import { IRootStore, __GLOBAL_GAME_STORE } from '../../../../Models/GlobalGameStore';
import { ItemGen } from '../../../../Models/Item/ItemGen';
import { WoodMaterialLib } from '../../../../Models/Item/Resources/WoodMaterialLib';

export enum EViews {
    Root,
    Shop,
    Inn,
    Forge,
    // TODO: Guild,
}

function setView(store: IRootStore, view: EViews) {
    store.player.currentTownView = view;
    __GLOBAL_REFRESH_FUNC_REF();
}

function getRootView(store: IRootStore) {
    let player = store.player;

    return (
        <div>
            <p>{player.currentArea.descriptions.root}</p>
            <button
                onClick={() => {
                    setView(store, EViews.Inn);
                }}
            >
                Visit Inn
            </button>
            <button
                onClick={() => {
                    setView(store, EViews.Shop);
                }}
            >
                Visit Shop
            </button>
            <button
                onClick={() => {
                    setView(store, EViews.Forge);
                }}
            >
                Visit Forge
            </button>
            {/* 
            TODO:
            <button
                onClick={() => {
                    setView(store, EViews.Guild);
                }}
            >
                Visit Local Guild
            </button>
            */}
        </div>
    );
}

function getInnView(store: IRootStore) {
    let d = store.player.currentArea.descriptions as TownDescription;

    return (
        <div>
            <h1>Inn</h1>
            <p>{d.inn}</p>
            <button
                onClick={() => {
                    // Allow player to rest if they have the 2 gp. Else, deny.
                    if (store.player.gold >= 2) {
                        store.player.gold -= 2;
                        store.player.fullHeal();
                        store.rpgConsole.add('You rest for a while and heal up to perfect condition.');
                    } else {
                        store.rpgConsole.add('You are too poor to rest here.');
                    }
                    __GLOBAL_REFRESH_FUNC_REF();
                }}
            >
                Rest (2 GP)
            </button>
            <button
                onClick={() => {
                    // Buy drinks and unlock knowledge about Erin.
                    if (store.player.gold >= 2) {
                        store.player.gold -= 2;
                        if (store.player.knowsErin === false) {
                            store.rpgConsole.add(
                                'You buy a round of drinks for the bar. As they celebrate, a man tells you about a Mage named Erin that he once knew.',
                            );
                            store.player.knowsErin = true;
                        } else {
                            store.rpgConsole.add(
                                'You buy a round of drinks at the bar and have a merry time with the other patrons.',
                            );
                        }
                    } else {
                        store.rpgConsole.add('You are too poor to buy drinks.');
                    }

                    __GLOBAL_REFRESH_FUNC_REF();
                }}
            >
                Buy A Round (2 GP)
            </button>
            {getBackButton(store)}
        </div>
    );
}

function getShopView(store: IRootStore) {
    let d = store.player.currentArea.descriptions as TownDescription;

    return (
        <div>
            <h1>Shop</h1>
            <p>{d.shop}</p>
            <h2>Buy List</h2>
            <button
                onClick={() => {
                    let herb = ItemGen.getOranHerb();

                    if (store.player.gold < 1) {
                        store.rpgConsole.add('You are too poor to buy this item.');
                    } else if (!store.player.inventory.canAdd(store.player, [herb])) {
                        store.rpgConsole.addItemFail(herb.name);
                    } else {
                        store.player.gold -= 1;
                        store.player.inventory.addItem(store.player, ItemGen.getOranHerb());
                        store.rpgConsole.add('You successfully buy an Oran Herb.');
                    }

                    __GLOBAL_REFRESH_FUNC_REF();
                }}
            >
                Oran Herb (1 gp)
            </button>
            {getBackButton(store)}
        </div>
    );
}

function getForgeView(store: IRootStore) {
    let player = store.player;
    let r = __GLOBAL_REFRESH_FUNC_REF; // short and cute reference
    let d = store.player.currentArea.descriptions as TownDescription;

    return (
        <div>
            <h1>Forge</h1>
            <p>{d.forge}</p>
            <h2>Forge List</h2>
            <div>
                <p>Wooden Sword</p>
                <p>Requires: 3x Oak Log, 5 GP</p>
                <button
                    onClick={() => {
                        // Precheck for gold, then logs, then success.
                        if (player.gold < 5) {
                            store.rpgConsole.add('You are too poor to craft this item.');
                            r();
                            return;
                        }

                        // Precheck logs.
                        if (!player.inventory.has_nameMatch(WoodMaterialLib.oak, 3)) {
                            store.rpgConsole.add('You need more ' + WoodMaterialLib.oak.name + 's to craft this item.');
                            r();
                            return;
                        }

                        // Remove item.
                        player.inventory.remove_nameMatch(WoodMaterialLib.oak, 3);

                        // Create Item and provide success. Remove items.
                        player.inventory.addItem(player, ItemGen.getOakSword());
                        store.rpgConsole.add('You successfully craft an Oak Sword!');
                        r();
                    }}
                >
                    Craft
                </button>
            </div>
            {getBackButton(store)}
        </div>
    );
}

/** TODO
function getGuildView(store: IRootStore) {
    return (
        <div>
            <h1>Guild</h1>
            <p>{store.player.currentArea.descriptions.guild}</p>
            {getBackButton(store)}
        </div>
    );
}
 */

function getBackButton(store: IRootStore) {
    return (
        <button
            onClick={() => {
                setView(store, EViews.Root);
            }}
        >
            Exit
        </button>
    );
}
export function TownComponent() {
    let store: IRootStore = __GLOBAL_GAME_STORE((__DATA) => __DATA);
    let view = store.player.currentTownView;
    let content: any;

    if (view === EViews.Root) {
        content = getRootView(store);
    } else if (view === EViews.Shop) {
        content = getShopView(store);
    } else if (view === EViews.Inn) {
        content = getInnView(store);
    } else if (view === EViews.Forge) {
        content = getForgeView(store);
    }

    /** TODO
     * else if (view === EViews.Guild) {
        content = getGuildView(store);
    } */

    return content;
}
