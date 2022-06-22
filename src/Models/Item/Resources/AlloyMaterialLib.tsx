import { Resource } from '../Item';
import MaterialLib from '../Shared/MaterialLib';

export class AlloyMaterialLib extends MaterialLib {
    constructor() {
        super([
            new Resource(
                'Bronze Bar',
                'A refined bar of brownish, orangish and yellowish metal that is great for making average tools and items ',
                4,
                4,
            ),
            new Resource('Iron Bar', 'A refined bar of iron that makes items with great quality.', 4, 4),
            new Resource(
                'Steel Bar',
                'A refined bar of iron and coal that can make exceptionally useful products.',
                4,
                6,
            ),
            new Resource(
                'Exum Bar',
                'A refined bar of Exum and coal used to make supernaturally strong products.',
                4,
                8,
            ),
            new Resource(
                'Diamond Bar',
                'A diamond that has been magically shaped into a bar that is ready for advanced crafting techniques.',
                4,
                11,
            ),
            new Resource(
                'Divinite Bar',
                'A bar of glowing white material that glows brightly with white light.',
                4,
                18,
            ),
        ]);
    }
}
