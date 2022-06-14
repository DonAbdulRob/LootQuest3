import React from 'react';
import './ResourceBar.css';

export interface ResourceBarProps {
    color: string;
    val: number;
    min: number;
    max: number;
}

/**
 *
 *
 * 2 from 1-3 = 50%
 *
 *
 * 0 to 10,
 * val is 3. That's 30%.
 *
 * 8 to 24.
 * Val is 16.
 *
 * That's 50%.
 *
 *
 * 1+3 / 2
 *
 */

export default function ResourceBar(props: ResourceBarProps) {
    let width = (props.val * 100) / (props.min + props.max);

    let style = {
        width: width + '%',
        backgroundColor: props.color,
    };

    return (
        <div id="myProgress">
            <div id="myBar" style={style}></div>
        </div>
    );
}
