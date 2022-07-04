import Icon from '@mdi/react';
import React, { MouseEventHandler } from 'react';
import { iconSizeStr } from '../../Models/GlobalGameStore';
import './IconButton.css';

export interface IconButtonProps {
    path: string;
    text?: string;
    onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
    allowClick?: boolean; // Prevents clicking icon if set.
}

export default function IconButton(props: IconButtonProps) {
    // Add icon-no-click if we don't allow click.
    let iconClassName = !props.allowClick ? 'icon-no-click' : '';

    /* If the text isn't empty, we need to add a little padding to the right of buttons
     to balance out the icon's visual impact on the left side of the text. */
    let buttonPadding = props.text !== undefined ? ' pad-right-10' : '';

    return (
        <button className={'button-with-icon' + buttonPadding} onClick={props.onClick}>
            <Icon className={iconClassName} path={props.path} size={iconSizeStr} />
            {props.text}
        </button>
    );
}
