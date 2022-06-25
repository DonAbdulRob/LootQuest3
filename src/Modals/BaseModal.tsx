/**
 * We take advantage of W3.CSS to handle the modal code easily with some minor modifications for react compatibility and customized usage.
 * Then, the actual use controls are in SettingsComponent.tsx
 */

import * as React from 'react';
import { __GLOBAL_REFRESH_FUNC_REF } from '../App';
import { __GLOBAL_GAME_STORE } from '../Models/GlobalGameStore';
import ModalStateManager from '../Models/Singles/ModalStateManager';
import { SettingsComponent } from './SettingsComponent';
import './BaseModal.css';

export default function BaseModal() {
    let modalStateManager: ModalStateManager = __GLOBAL_GAME_STORE((__DATA: any) => __DATA.modalStateManager);
    let modalRef = React.useRef<HTMLDivElement>(null);

    // post-render event setup.
    React.useEffect(() => {
        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function (event) {
            let e: any = event.target;

            if (e.className === 'w3-modal' && modalRef.current !== null) {
                modalStateManager.toggleVisible();
                __GLOBAL_REFRESH_FUNC_REF();
            }
        };
    });

    // We return a W3.CSS modal containing our 'coreDisplay' which is our own Settings Component.
    return (
        <div className="max-z">
            <button
                onClick={() => {
                    modalStateManager.toggleVisible();
                    __GLOBAL_REFRESH_FUNC_REF();
                }}
            >
                Settings
            </button>

            <div className="w3-modal" ref={modalRef} style={{ display: modalStateManager.getBlockOrNot() }}>
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
                    <SettingsComponent />
                </div>
            </div>
        </div>
    );
}
