import React, { useState } from "react";
import wlcImg from '../assets/linkedln_banner.png'
import { Link } from "react-router-dom";
import GoogleLoginButton from "../Components/GoogleLoginButton";


function LoginPage(props) {

    return (
        <div className="loginPage">
            <div className="login_contents">
                <div className="wlc_text">Welcome to professional Community</div>
                <div className="login_google"><GoogleLoginButton changeLoginValue={props.changeLoginValue} /></div>
                <div className="login_email"> <Link to="/signIn">Sign in with email</Link> </div>
                <div className="login_continue_text">By clicking continue to join or sign in, you are agree to
                    <span className="blue_text"> Linkedln's User Agreement</span>, <span className="blue_text">Privacy Policy</span>, and <span className="blue_text">Cookie Policy</span>.
                </div>
                <div className="new_login">
                    New to Linkedln? <Link to="/signUp" className="blue_text">Join now</Link>
                </div>
            </div>
            <div className="wlc_img">
                <img src={wlcImg} alt="welcomeImg" />
            </div>

        </div>
    )
}

export default LoginPage