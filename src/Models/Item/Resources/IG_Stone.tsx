import { Resource } from '../Item';
import ItemGroup from '../Shared/ItemGroup';

export class IG_Stone extends ItemGroup {
    static grey_stone = () => {
        return new Resource(
            'Grey Stone',
            'A mass of silica-based minerals similar to those found everywhere. Quite durable and heavy even in a small amount.',
            5,
            1,
        );
    };

    constructor() {
        super([IG_Stone.grey_stone()]);
    }
}
