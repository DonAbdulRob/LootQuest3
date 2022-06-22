import { Resource } from '../Item';

export default class MaterialLib {
    resourceArr: Resource[];

    constructor(resourceArr: Resource[]) {
        this.resourceArr = resourceArr;
    }

    public getResource(minLevel?: number, maxLevel?: number): Resource[] {
        let finalMinLevel = 999;
        let finalMaxLevel = 999;
        if (minLevel !== undefined) {
            finalMinLevel = minLevel;
        }

        if (maxLevel !== undefined) {
            finalMaxLevel = maxLevel;
        }

        let resources: Resource[] = [];

        for (var resource of this.resourceArr) {
            if (resource.materialLevel >= finalMinLevel && resource.materialLevel <= finalMaxLevel) {
                resources.push(resource);
            }
        }

        return resources;
    }
}
