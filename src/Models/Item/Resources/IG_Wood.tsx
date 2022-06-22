import { Resource } from '../Item';
import ItemGroup from '../Shared/ItemGroup';

export class IG_Wood extends ItemGroup {
    static oak = () => {
        return new Resource('Oak Log', 'Wood from the common Oak Tree that has moderate quality.', 3, 1);
    };
    static yew = () => {
        return new Resource('Yew Log', 'Wood from the Yew tree that possesses above-average quality.', 5, 4);
    };
    static redwood = () => {
        return new Resource('Redwood Log', 'Wood from the Tall Redwood trees that has exceptional quality.', 8, 7);
    };
    static tera = () => {
        return new Resource(
            'Tera Log',
            'Wood from a thousand-year old Tera Tree containing the natural essences of the world.',
            12,
            10,
        );
    };
    static boran = () => {
        return new Resource(
            'Boran Log',
            'Wood from the Mighty Boran Tree possessing only the richest worldly essences.',
            15,
            24,
        );
    };
    static sera = () => {
        return new Resource('Sera Log', 'Wood from the Ancient Sera Tree.', 20, 16);
    };
    static divine = () => {
        return new Resource('Divine Log', 'Wood from a divine tree that exists beyond worldly balance.', 30, 20);
    };

    constructor() {
        super([
            IG_Wood.oak(),
            IG_Wood.yew(),
            IG_Wood.redwood(),
            IG_Wood.tera(),
            IG_Wood.boran(),
            IG_Wood.sera(),
            IG_Wood.divine(),
        ]);
    }
}
