/**
 * The load game component makes use of the 'WTF Forms' 'hack' to create a custom-styled file input component.
 */
import React from 'react';
import { IRootStore, __GLOBAL_GAME_STORE } from '../../../Models/GlobalGameStore';
import { __GLOBAL_REFRESH_FUNC_REF } from '../../../App';
import './LoadGame.css';
import { SaveLib } from '../../../Models/SaveLib';
import { PageContainer } from '../../Enums/PageContainer';

export default function LoadGameComponent() {
    let store: IRootStore = __GLOBAL_GAME_STORE((__DATA: any) => __DATA);

    function changeFunc(inputEvent: any) {
        let file = inputEvent.target.files[0];
        let reader = new FileReader();

        reader.addEventListener('load', function (loadEvent: any) {
            // Load the data, output to console, then send player to play page.
            SaveLib.loadStateFromSave(store, loadEvent.target.result);
            store.rpgConsole.add('Game loaded.');
            store.setPage(PageContainer.Play);
            __GLOBAL_REFRESH_FUNC_REF();
        });

        reader.readAsText(file);
    }

    return (
        <form className="custom-file-input">
            <label className="file">
                <input type="file" id="file" onChange={changeFunc} />
                <span className="file-custom"></span>
            </label>
        </form>
    );
}
