/**
 * Item Groups are various resources that are similar to each other that have been grouped together for convenience.
 * Like, making it easy to get a random wood from our wood materials using IG_Wood.get()
 * Every resource is created function a function since they are all unique from each other.
 */
import { Consumable, Equipment, Item, Resource } from '../Item';

export default class ItemGroup {
    itemArr: (Item | Equipment | Consumable | Resource)[];

    constructor(itemArr: (Item | Equipment | Consumable | Resource)[]) {
        this.itemArr = itemArr;
    }

    public getResource(minLevel?: number, maxLevel?: number): (Item | Equipment | Consumable | Resource)[] {
        let finalMinLevel = 999;
        let finalMaxLevel = 999;

        if (minLevel !== undefined) {
            finalMinLevel = minLevel;
        }

        if (maxLevel !== undefined) {
            finalMaxLevel = maxLevel;
        }

        let resources: (Item | Equipment | Consumable | Resource)[] = [];

        for (var resource of this.itemArr) {
            if (resource.level >= finalMinLevel && resource.level <= finalMaxLevel) {
                resources.push(resource);
            }
        }

        return resources;
    }
}
