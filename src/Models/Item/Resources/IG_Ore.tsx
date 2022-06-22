import { Resource } from '../Item';
import ItemGroup from '../Shared/ItemGroup';

export class IG_Ore extends ItemGroup {
    static coal = () => {
        return new Resource(
            'Coal Ore',
            'A black resource that is useless on its own, but is great for making metallic alloys.',
            3,
            2,
        );
    };
    static copper = () => {
        return new Resource(
            'Copper Ore',
            'A brownish-orange and blueish-green metal chunk suitable for making low-level tools and items',
            4,
            2,
        );
    };
    static iron = () => {
        return new Resource('Iron Ore', 'A hard & silver metal encased in stone', 4, 5);
    };
    static exum = () => {
        return new Resource('Exum Ore', 'A hard dark-blue metal that ', 4, 8);
    };
    static diamond = () => {
        return new Resource('Raw Diamond', 'A chunk of raw untouched diamond.', 4, 10);
    };
    static divinite = () => {
        return new Resource('Divinite Chunk', 'A white fragment of matter that glows with faint white light.', 4, 16);
    };

    constructor() {
        super([IG_Ore.coal(), IG_Ore.copper(), IG_Ore.iron(), IG_Ore.exum(), IG_Ore.diamond(), IG_Ore.divinite()]);
    }
}
