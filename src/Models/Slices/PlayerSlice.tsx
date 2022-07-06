import produce from 'immer';
import { StoreSlice } from './StoreSlice';
import { Player } from '../Fighter/Player';
import { IRootStore } from '../GlobalGameStore';

export interface IPlayerSlice {
    player: Player;
}

export const createPlayerSlice: StoreSlice<IPlayerSlice> = (set, get) => ({
    player: new Player(),
});
