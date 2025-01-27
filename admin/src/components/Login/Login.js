import axios from "axios";
import React, { useState } from "react";
import { backendURL } from "../../App";

const Login = ({ setToken }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault();
            const response = await axios.post(`${backendURL}/user/admin`, {email, password})
            if (response.data.success) {
                setToken(response.data.token)
            } else {
                alert(response.data.message)
            }
            
            
        } catch (error) {
            console.log(error);
            alert(error.message)
        }
    }
    return (
        <div>
            <h1>Admin Panel</h1>
            <form onSubmit={onSubmitHandler}>
                <div>
                    <p>Email Address</p>
                    <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder="Your email" required />
                </div>
                <div>
                    <p>Password</p>
                    <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder="Password" required />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login