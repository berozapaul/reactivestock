import React from 'react';
import ReactDOM from 'react-dom';
import AppContext from '../AppContext';
/*
 * Purpose: The purpose of this component is to use React portal to render
 *          modal outside the main DOM hierarchy.
 * Version: 1.0
 * Author: dev@cefalo.com
 */

const Modal = ({ modalType, children }) => (
    <AppContext.Consumer>
        {(context) => { // Consumer requires a function as a child
            if (context.state.openModalId === modalType) {
                // Portals are a way to render React children outside the main DOM hierarchy of the parent
                // component without losing the react context.
                return ReactDOM.createPortal(
                    <div className="overlay">
                        <div className="modal">
                            {children(context)}
                        </div>
                    </div>,
                    document.getElementById('modal-root')
                );
            }

            return null;
           }
        }

    </AppContext.Consumer>
);

export default Modal;
