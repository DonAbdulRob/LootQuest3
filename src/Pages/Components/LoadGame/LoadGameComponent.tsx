/**
 * The load game component makes use of the 'WTF Forms' 'hack' to create a custom-styled file input component.
 */
import React from 'react';
import { Player } from '../../../Models/Fighter/Player';
import { __GLOBAL_GAME_STORE } from '../../../Models/GlobalGameStore';
import { RpgConsole } from '../../../Models/Singles/RpgConsole';
import { __GLOBAL_REFRESH_FUNC_REF } from '../../PlayPage';
import './LoadGame.css';

export default function LoadGameComponent() {
    let player: Player = __GLOBAL_GAME_STORE((__DATA: any) => __DATA.player);
    let rpgConsole: RpgConsole = __GLOBAL_GAME_STORE((__DATA: any) => __DATA.rpgConsole);

    function changeFunc(e: any) {
        let file = e.target.files[0];
        let reader = new FileReader();

        reader.addEventListener('load', function (e1: any) {
            player.fromJSON(e1.target.result);
            rpgConsole.add('Game loaded.');
            __GLOBAL_REFRESH_FUNC_REF();
        });

        reader.readAsText(file);
    }

    return (
        <div>
            <form className="custom-file-input">
                <label className="file">
                    <input type="file" id="file" onChange={changeFunc} />
                    <span className="file-custom"></span>
                </label>
            </form>
        </div>
    );
}
