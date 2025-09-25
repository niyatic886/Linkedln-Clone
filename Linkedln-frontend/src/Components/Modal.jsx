import React from "react";
import CloseIcon from '@mui/icons-material/Close';

function Modal(props) {
    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <div className="modal-header">
                    <div className="modal-title-wrapper">
                        <div className="text-2xl">{props.title}</div>
                    </div>
                    <div onClick={()=>props.closeModal()} className="cursor-pointer"><CloseIcon /></div>
                </div>

                <div className="modal-body">
                    {props.children}
                </div>
            </div>
        </div>
    )
}


export default Modal