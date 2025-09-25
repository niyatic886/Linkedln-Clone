
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import GoogleLoginButton from "../Components/GoogleLoginButton";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

function SignIn(props) {
    const navigate = useNavigate();

    const [loginField, setLoginField] = useState({ email: "", password: "" });

    const onChangeInput = (e, key) => {
        setLoginField({ ...loginField, [key]: e.target.value });
    }

    const handleLogin = async () => {
        if (loginField.email.trim().length === 0 || loginField.password.trim().length === 0) {
            return toast.error("Please fill all the credentials");
        }
        await axios.post("http://localhost:3000/api/auth/login", loginField, { withCredentials: true }).then((res) => {
            props.changeLoginValue(true);
            localStorage.setItem('isLogin', 'true');
            localStorage.setItem('userInfo', JSON.stringify(res.data.userExist));
            navigate("/feeds");


        }).catch((err) => {
            console.log(err);
            toast.error(err?.response?.data?.error);
        });

    }

    return (
        <div className="signIn">
            <div className="signIn_container">
                <div className="signIn_title">Sign In</div>
                <div><GoogleLoginButton changeLoginValue={props.changeLoginValue} /></div>
                <div className="or-container">
                    <div className="or-line"></div>
                    <div className="or-text">or</div>
                    <div className="or-line"></div>
                </div>
                <div className="form_content">
                    <label>Email</label>
                    <input type="text" value={loginField.email} onChange={(e) => onChangeInput(e, 'email')} placeholder="Email or Phone" />
                </div>

                <div className="form_content">
                    <label>Password</label>
                    <input type="password" value={loginField.password} onChange={(e) => onChangeInput(e, 'password')} placeholder="Password" />
                </div>
                <div onClick={handleLogin} className="register_bttn">Login</div>


            </div>
            <div className="sign-in-wrapper">
                New to LinkedIn? <Link to="/signUp" className="blue_text">Join Now</Link>
            </div>
            <ToastContainer />



        </div>
    )
}


export default SignIn