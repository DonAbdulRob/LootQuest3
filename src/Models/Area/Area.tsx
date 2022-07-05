/**
 * An area is some place a player can visit.
 * It has lore, a level range, area connections and encounters.
 */

import AreaDescriptions from './AreaDescriptions';
import EAreaType from './EAreaType';

export default class Area {
    name: string;
    descriptions: AreaDescriptions;
    levelMin: number;
    levelMax: number;
    connectedAreas: Area[];
    type: EAreaType;

    constructor(name: string, descriptions: AreaDescriptions, type: EAreaType, levelMin: number, levelMax: number) {
        this.name = name;
        this.descriptions = descriptions;
        this.type = type;
        this.levelMin = levelMin;
        this.levelMax = levelMax;
        this.connectedAreas = [];
    }

    hasArea(areaArg: Area) {
        for (let area of this.connectedAreas) {
            if (area.name === areaArg.name) {
                return true;
            }
        }

        return false;
    }

    addConnectedArea(area: Area) {
        if (this.hasArea(area)) {
            return;
        }

        this.connectedAreas.push(area);
    }

    getDisplay(): string {
        return this.name + ' - ' + this.getLevelDisplay();
    }

    getLevelDisplay(): string {
        let pref = 'Lvl: ' + this.levelMin;

        if (this.levelMin === this.levelMax) {
            return pref;
        }
        return pref + ' - ' + this.levelMax;
    }
}
