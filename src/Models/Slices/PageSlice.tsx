import IPageEnum from '../../Pages/Enums/IPageEnum';
import { StoreSlice } from './StoreSlice';

export interface IPageSlice {
    page: IPageEnum;
    setPage: Function;
}

export const createPageSlice: StoreSlice<IPageSlice> = (set, get) => ({
    page: IPageEnum.Play,
    setPage: (x: number) =>
        set((prev: IPageSlice) => {
            prev.page = x;
            return prev;
        }),
});
