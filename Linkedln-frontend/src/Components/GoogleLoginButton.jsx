import React from "react";
import { GoogleLogin } from '@react-oauth/google';
import axios from "axios";
import { useNavigate } from "react-router-dom";


function GoogleLoginButton(props) {
    const navigate = useNavigate();

    const handleOnSucess = async (credResponse) => {
        const token = credResponse.credential;
        const res = await axios.post("http://localhost:3000/api/auth/google", { token }, { withCredentials: true });

        localStorage.setItem('isLogin', 'true');
        localStorage.setItem('userInfo', JSON.stringify(res.data.user));
        props.changeLoginValue(true);
        navigate("/feeds");
    }

    return (
        <div>
            <GoogleLogin
                onSuccess={(credentialResponse) => handleOnSucess(credentialResponse)}
                onError={() => {
                    console.log('Login Failed');
                }}

            />

        </div>
    )
}

export default GoogleLoginButton