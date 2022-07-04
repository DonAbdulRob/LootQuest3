/**
 * The Page Slice manages the data relating to the currently visible page displayed by the game.
 */
import { Page } from '../../Pages/Enums/Page';
import { PageContainer } from '../../Pages/Enums/PageContainer';
import { StoreSlice } from './StoreSlice';

export interface IPageSlice {
    page: Page;
    setPage: Function;
}

export const createPageSlice: StoreSlice<IPageSlice> = (set, get) => ({
    page: PageContainer.MainMenu, // MainMenu for prod, Play for debug.
    setPage: (x: Page) =>
        set(() => ({
            page: x,
        })),
});
