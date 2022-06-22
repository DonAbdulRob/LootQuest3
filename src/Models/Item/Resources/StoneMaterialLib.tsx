import { Resource } from '../Item';
import MaterialLib from '../Shared/MaterialLib';

export class StoneMaterialLib extends MaterialLib {
    constructor() {
        super([
            new Resource(
                'Grey Stone',
                'A mass of silica-based minerals similar to those found everywhere. Quite durable and heavy even in a small amount.',
                5,
                1,
            ),
        ]);
    }
}
