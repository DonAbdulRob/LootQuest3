import { Resource } from '../Item';
import MaterialLib from '../Shared/MaterialLib';

export class OreMaterialLib extends MaterialLib {
    constructor() {
        super([
            new Resource(
                'Coal Ore',
                'A black resource that is useless on its own, but is great for making metallic alloys.',
                3,
                2,
            ),
            new Resource(
                'Copper Ore',
                'A brownish-orange and blueish-green metal chunk suitable for making low-level tools and items',
                4,
                2,
            ),
            new Resource('Iron  Ore', 'A hard & silver metal encased in stone', 4, 5),
            new Resource('Exum Ore', 'A hard dark-blue metal that ', 4, 8),
            new Resource('Raw Diamond', 'A chunk of raw untouched diamond.', 4, 10),
            new Resource('Divinite Chunk', 'A white fragment of matter that glows with faint white light.', 4, 16),
        ]);
    }
}
