import React from 'react';
import ExploreComponent from './SubWindows/ExploreComponent';
import './EmbeddedWindowComponent.css';
import AreaComponent from './Area/AreaComponent';

export default function EmbeddedWindowComponent() {
    return (
        <div className="embedded-window-core">
            <AreaComponent />
            <ExploreComponent />
        </div>
    );
}
