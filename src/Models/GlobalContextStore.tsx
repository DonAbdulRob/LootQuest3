/**
 * The global context store is an alternative store implementation from Zustand added purely for demonstrational purposes.
 * It includes the Theme MAnager object and manages it using our global refresh scheme.
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
