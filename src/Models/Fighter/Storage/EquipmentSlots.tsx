/**
 * Equipment slots are a collection of items with a fixed requirement for what type of 'EquipmentType' can go into each index.
 * EquipmentSlotMapping defines this mapping.
 */
import { Equipment } from '../../Item/Item';

export enum EquipmentSlotMapping {
    weapon = 0,
    chestplate = 1,
}

export class EquipmentSlots {
    items: Array<Equipment | null> = [];

    constructor() {
        this.items = Array(Object.keys(EquipmentSlotMapping).length / 2).fill(null);
    }

    clear() {
        this.items = [];
    }
}
