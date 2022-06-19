/**
 * This is the version of the embedded component suitable for persisting within a floating window.
 */
import React from 'react';
import { IRootStore, __GLOBAL_GAME_STORE } from '../../Models/GlobalGameStore';
import { getMainComponentContent } from './EmbeddedMainComponent';
import './EmbeddedMainComponent.css';

export default function FloatingMainComponent(): JSX.Element {
    let store: IRootStore = __GLOBAL_GAME_STORE((__DATA) => __DATA);
    let content = getMainComponentContent(store, false);
    return <div className="window-core-large embedded-window-copy-core">{content}</div>;
}
