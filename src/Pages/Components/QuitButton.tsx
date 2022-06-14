import React from 'react';
import { G_RESET_GAME_STORE } from '../../Models/GlobalGameStore';
import { G_GO_TO_PAGE } from '../SharedProps/GoToPageFunc';
import { PageProps } from '../SharedProps/PageBaseProps';
import { PageEnum } from '../SharedProps/PageEnum';

export default function QuitButton(props: PageProps) {
    return (
        <button
            onClick={() => {
                G_GO_TO_PAGE(props, PageEnum.MainMenu);
                G_RESET_GAME_STORE();
            }}
        >
            Quit to Main Menu
        </button>
    );
}
