import { Resource } from '../Item';
import ItemGroup from '../Shared/ItemGroup';

export class IG_Alloy extends ItemGroup {
    static bronze = () => {
        return new Resource(
            'Bronze Bar',
            'A refined bar of brownish, orangish and yellowish metal that is great for making average tools and items ',
            4,
            4,
        );
    };
    static iron = () => {
        return new Resource('Iron Bar', 'A refined bar of iron that makes items with great quality.', 4, 4);
    };
    static steel = () => {
        return new Resource(
            'Steel Bar',
            'A refined bar of iron and coal that can make exceptionally useful products.',
            4,
            6,
        );
    };
    static exum = () => {
        return new Resource(
            'Exum Bar',
            'A refined bar of Exum and coal used to make supernaturally strong products.',
            4,
            8,
        );
    };
    static diamond = () => {
        return new Resource(
            'Diamond Bar',
            'A diamond that has been magically shaped into a bar that is ready for advanced crafting techniques.',
            4,
            11,
        );
    };
    static divinite = () => {
        return new Resource(
            'Divinite Bar',
            'A bar of glowing white material that glows brightly with white light.',
            4,
            18,
        );
    };

    constructor() {
        super([
            IG_Alloy.bronze(),
            IG_Alloy.iron(),
            IG_Alloy.steel(),
            IG_Alloy.exum(),
            IG_Alloy.bronze(),
            IG_Alloy.diamond(),
            IG_Alloy.divinite(),
        ]);
    }
}
