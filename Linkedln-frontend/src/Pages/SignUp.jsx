import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import GoogleLoginButton from "../Components/GoogleLoginButton";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";


function SignUp(props) {
    const navigate = useNavigate();

    const [registerField, setRegisterField] = useState({ email: "", password: "", f_name: "" })

    const handleInputField = (e, key) => {
        setRegisterField({ ...registerField, [key]: e.target.value })
    }

    const handleRegister = async () => {
        if (registerField.email.trim().length === 0 || registerField.password.trim().length === 0 || registerField.f_name.trim().length === 0) {
            return toast.error("Please fill all the fields");

        }
        await axios.post("http://localhost:3000/api/auth/register", registerField).then(res => {
            toast.success("Registration Successful! Please Login.");
            setRegisterField({ ...registerField, email: "", password: "", f_name: "" })
            navigate("/signIn");

        }).catch(err => {
            console.log(err);
            toast.error(err?.response?.data?.error)
        })
    }

    return (
        <div className="signUp">
            <div className="signUp_text">Make the most of your professional life</div>

            <div className="form_container">
                <div className="form_content">
                    <label htmlFor="email">Email</label>
                    <input value={registerField.email} onChange={(e) => handleInputField(e, 'email')} type="text" placeholder="Email" />
                </div>
                <div className="form_content">
                    <label htmlFor="password">Password</label>
                    <input value={registerField.password} onChange={(e) => handleInputField(e, 'password')} type="password" placeholder="Password" />
                </div>
                <div className="form_content">
                    <label htmlFor="f_name">Full Name</label>
                    <input value={registerField.f_name} onChange={(e) => handleInputField(e, 'f_name')} type="text" placeholder="Full Name" />
                </div>
                <div onClick={handleRegister} className="register_bttn">Register</div>
                <div class="or-container">
                    <div class="or-line"></div>
                    <div class="or-text">or</div>
                    <div class="or-line"></div>
                </div>
                <div><GoogleLoginButton changeLoginValue={props.changeLoginValue} /></div>
            </div>
            <div class="sign-in-wrapper">
                Already on LinkedIn? <Link to="/signIn" className="blue_text">Sign in</Link>
            </div>


            <ToastContainer />


        </div>
    )
}

export default SignUp