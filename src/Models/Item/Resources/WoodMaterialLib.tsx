import { Resource } from '../Item';
import MaterialLib from '../Shared/MaterialLib';

export class WoodMaterialLib extends MaterialLib {
    static oak = new Resource('Oak Log', 'Wood from the common Oak Tree that has moderate quality.', 3, 1);
    static yew = new Resource('Yew Log', 'Wood from the Yew tree that possesses above-average quality.', 5, 4);
    static redwood = new Resource(
        'Redwood Log',
        'Wood from the Tall Redwood trees that has exceptional quality.',
        8,
        7,
    );
    static tera = new Resource(
        'Tera Log',
        'Wood from a thousand-year old Tera Tree containing the natural essences of the world.',
        12,
        10,
    );
    static boran = new Resource(
        'Boran Log',
        'Wood from the Mighty Boran Tree possessing only the richest worldly essences.',
        15,
        24,
    );
    static sera = new Resource('Sera Log', 'Wood from the Ancient Sera Tree.', 20, 16);
    static divine = new Resource('Divine Log', 'Wood from a divine tree that exists beyond worldly balance.', 30, 20);

    constructor() {
        super([
            WoodMaterialLib.oak,
            WoodMaterialLib.yew,
            WoodMaterialLib.redwood,
            WoodMaterialLib.tera,
            WoodMaterialLib.boran,
            WoodMaterialLib.sera,
            WoodMaterialLib.divine,
        ]);
    }
}
