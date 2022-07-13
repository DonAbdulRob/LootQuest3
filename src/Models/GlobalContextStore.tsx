/**
 * The global context store is an alternative store implementation from Zustand added purely for demonstrational purposes.
 * It includes the Theme Manager object and does not use the 'global display refresh' design scheme implemented for Zustand to show
 * my capability to optionally implement a native react global state management scheme that doesn't rely on force updating a root component.
 */
import React from 'react';
import ThemeManager from './Singles/ThemeManager';

export const StateContext = React.createContext(undefined);

export interface GlobalContextInterface {
    themeManager: ThemeManager;
}

export function _G_GET_NEW_GLOBAL_CONTEXT_STATE_OBJECT(): GlobalContextInterface {
    return {
        themeManager: new ThemeManager(),
    };
}
