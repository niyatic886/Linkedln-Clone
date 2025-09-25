import React, {useState} from "react";
import linkedlnLogo from '../assets/Linkedln_icon.png';

function Footer1(){

    return(
        <div className="footer1">
            <div className="footer_contents">
                <div className="footer_logo">
                    <h3>Linked</h3>
                    <img src={linkedlnLogo} alt="linkedln-img" />
                </div>
                <div className="footer_copyright">@Copyright 2025 </div>
            </div>

        </div>
    )
}

export default Footer1