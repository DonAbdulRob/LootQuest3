/**
 * The intro page is what the player sees immediately upon starting the game (perhaps add animation to start one day?)
 */

import * as React from 'react';
import { PageProps } from './SharedProps/PageBaseProps';

export default function IntroPage(props: PageProps) {
    function openMainPage() {
        props.setPage(1);
    }

    return (
        <div id="IntroPage" className="container">
            <div className="mb-1">
                <br />
            </div>

            <div className="p-5 mb-2 bg-primary text-white rounded">
                <h1 className="mt-5 mb-5 text-center">Welcome to LootQuest 2!</h1>
            </div>

            <div className="center">
                <button
                    onClick={() => {
                        openMainPage();
                    }}
                >
                    Start
                </button>
                <br />
            </div>
        </div>
    );
}
