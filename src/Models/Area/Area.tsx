/**
 * An area is some place a player can visit.
 * It has lore, a level range, area connections and encounters.
 */

import EAreaType from './EAreaType';

export default class Area {
    name: string;
    description: string;
    levelMin: number;
    levelMax: number;
    connectedAreas: Area[];
    type: EAreaType = EAreaType.TOWN;

    constructor(name: string, description: string, type: EAreaType, levelMin: number, levelMax: number) {
        this.name = name;
        this.description = description;
        this.levelMin = levelMin;
        this.levelMax = levelMax;
        this.connectedAreas = [];
    }

    hasArea(areaArg: Area) {
        for (var area of this.connectedAreas) {
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

    getLevelDisplay(): string {
        let pref = 'Lvl: ' + this.levelMin;

        if (this.levelMin === this.levelMax) {
            return pref;
        }
        return pref + ' - ' + this.levelMax;
    }
}
