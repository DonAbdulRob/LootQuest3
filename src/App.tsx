/**
 * The main component handles the highest-level routing of pages based on user interaction.
 * See EPages.tsx for page options and PageSlice.tsx for page store management.
 */

import * as React from 'react';
import { StateContext, _G_GET_NEW_GLOBAL_CONTEXT_STATE_OBJECT } from './Models/GlobalContextStore';
import { __GLOBAL_GAME_STORE } from './Models/GlobalGameStore';
import { Page } from './Pages/Enums/Page';

export let __GLOBAL_REFRESH_FUNC_REF: Function;

export default function App(): JSX.Element {
    const [refreshVar, setRefreshVar] = React.useState(0);
    let page: Page = __GLOBAL_GAME_STORE((__DATA: any) => __DATA.page);
    let showAnimation = page.showAnimation ? ' bg-animation' : '';
    const stateArr = React.useState(_G_GET_NEW_GLOBAL_CONTEXT_STATE_OBJECT());
    const [state, setState] = stateArr;

    // Set our global refresh function used to refresh pages on store changes.
    __GLOBAL_REFRESH_FUNC_REF = () => {
        // Increment 'refresh var' to force refresh.
        setRefreshVar((v: number) => v + 1);
    };

    // Since we can't declare the refresh func as const, freeze it now to prevent unintended modification.
    Object.freeze(__GLOBAL_REFRESH_FUNC_REF);

    // Have theme manager update its values to reflect new color settings.
    state.themeManager.doUpdate();

    return (
        <StateContext.Provider value={stateArr}>
            <div className={'app' + showAnimation} key={refreshVar}>
                {page.component}
            </div>
        </StateContext.Provider>
    );
}
