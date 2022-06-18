import produce from 'immer';
import { StoreSlice } from './StoreSlice';
import { Player } from '../Fighter/Player';

export interface IPlayerSlice {
    player: Player;
    generatePlayer: () => void;
    setPlayerName: (s: string) => void;
}

export const createPlayerSlice: StoreSlice<IPlayerSlice> = (set, get) => ({
    player: new Player(),
    generatePlayer: () =>
        set((prev: IPlayerSlice) => {
            prev.generatePlayer();
            return prev;
        }),

    setPlayerName: (x: string) =>
        set(
            produce((state: any) => {
                state.player.name = x;
            }),
        ),
});
