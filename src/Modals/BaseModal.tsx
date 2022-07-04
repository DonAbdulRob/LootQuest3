/**
 * We take advantage of W3.CSS to handle the modal code easily with some minor modifications for react compatibility and customized usage.
 * The modal can take any sub-component as a prop to display within it, along with button text and an icon.
 */

import Icon from '@mdi/react';
import * as React from 'react';
import { __GLOBAL_REFRESH_FUNC_REF } from '../App';
import { iconSizeStr, __GLOBAL_GAME_STORE } from '../Models/GlobalGameStore';
import ModalStateManager from '../Models/Singles/ModalStateManager';
import './BaseModal.css';

export interface ModalProps {
    buttonText: string;
    component: JSX.Element;
    iconPath: string;
}

export default function BaseModal(props: ModalProps) {
    let modalStateManager: ModalStateManager = __GLOBAL_GAME_STORE((__DATA: any) => __DATA.modalStateManager);
    let modalRef = React.useRef<HTMLDivElement>(null);
    let modalClassName = 'w3-modal max-z';

    // post-render event setup.
    React.useEffect(() => {
        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function (event) {
            let e: any = event.target;

            if (e.className === modalClassName && modalRef.current !== null) {
                modalStateManager.toggleVisible();
                __GLOBAL_REFRESH_FUNC_REF();
            }
        };
    });

    // We return a W3.CSS modal containing our 'coreDisplay' which is our own Settings Component.
    return (
        <div>
            <button
                className="button-with-icon"
                onClick={() => {
                    modalStateManager.toggleVisible();
                    __GLOBAL_REFRESH_FUNC_REF();
                }}
            >
                <Icon path={props.iconPath} size={iconSizeStr} />
                {props.buttonText}
            </button>

            <div className={modalClassName} ref={modalRef} style={{ display: modalStateManager.getBlockOrNot() }}>
                <div className="w3-modal-content modal-border">
                    <span
                        onClick={() => {
                            modalStateManager.toggleVisible();
                            __GLOBAL_REFRESH_FUNC_REF();
                        }}
                        className="w3-button w3-display-topright"
                    >
                        &times;
                    </span>
                    {props.component}
                </div>
            </div>
        </div>
    );
}
