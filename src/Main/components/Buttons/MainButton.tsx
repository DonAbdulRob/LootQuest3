import * as React from 'react';
import './MainButton.css';

interface Props {
    text: string;
    callBack: any;
}

export default function MainButton(props: Props) {
    return (
        <button
            type="button"
            className="btn btn-primary mb-2 px-5"
            onClick={props.callBack}
        >
            {props.text}
        </button>
    );
}
