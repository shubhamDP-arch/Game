import React, { useState } from "react";
import '/styles/loginStyle.css';
import { Navigate, useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";
import { useAuth } from "../../store/auth";

function Login() {
    const navigate = useNavigate();
    const {storeTokenInLS, token, storeShopIdInLS} = useAuth()
    const [action, setAction] = useState("SignUp");
    const [isOtp, setOtp] = useState(false);
    const backapi = "http://localhost:5000"
    const [formData, setFormData] = useState({
        adminName: "",
        email: "",
        password: "",
        otp: ""
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSignUpSubmit = async (event) => {
        event.preventDefault();
        
        if (!isSubmitted) {
           
            try {
                const response = await fetch(`${backapi}/api/auth/register`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });
                console.log(response)
                const data = await response.json();

                if(data.alreadymsg){
                    toast.error(data.alreadymsg)
                }
                if (data.msg) {
                    toast.success(data.msg)
                    setIsSubmitted(true);
                    setOtp(true);
                } else {
                    console.log("Error in SignUp:", data.message);
                }
            } catch (error) {
                console.error("SignUp Error:", error);
            }
        } else if (isOtp) {
            // OTP Verification request
            try {
                const response = await fetch(`${backapi}/api/auth/verifyotp/${formData.email}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email: formData.email, otp: formData.otp })
                });

                const data = await response.json();
                if (data.inmsg) {
                    toast.error(data.inmsg);
                    
                } else if(data.sucmsg){
                    toast.success(data.sucmsg);
                    navigate("/login");
                }
            } catch (error) {
                console.error("OTP Verification Error:", error);
            }
        }
    };

    const handleLoginSubmit = async (event) => {
        event.preventDefault();
        
        try {
            const response = await fetch(`${backapi}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            console.log(data)
            if (data.message) {
                toast.error(data.message)
            } else if(data.sucmsg){
                toast.success(data.sucmsg)
                storeTokenInLS(data.accessToken)
                storeShopIdInLS(data.admin.shopID)
                navigate("/home")
            }
        } catch (error) {
            console.error("Login Error:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFormSubmit = (event) => {
        if (action === "SignUp") {
            handleSignUpSubmit(event);
        } else {
            handleLoginSubmit(event);
        }
    };

    if(token)
    {
        return <Navigate to='/home'/>
    }

    return (
        <div className="main1">
            <video autoPlay loop muted playsInline className="back-video">
                <source src="/87789-602074264_small.mp4" type="video/mp4" />
            </video>
            <div className="Container">
                <div className="Header">
                    <div className="text">{action}</div>
                    <div className="underLine"></div>
                </div>
                <form method="post" onSubmit={handleFormSubmit}>
                    <div className="radioInput">
                        <label>
                            <input
                                type="radio"
                                name="role"
                                value="admin"
                                checked={formData.role === "admin"}
                                onChange={handleInputChange}
                            />
                            Admin
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="role"
                                value="employee"
                                checked={formData.role === "employee"}
                                onChange={handleInputChange}
                            />
                            Employee
                        </label>
                    </div>
                    <div className="inputs">
                        {action === "Login" ? null : (
                            <div className="input">
                                <input
                                    type="text"
                                    placeholder="Name"
                                    name="adminName"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                />
                            </div>
                        )}
                        <div className="input">
                            <input
                                type="email"
                                placeholder="Email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                autoComplete="off"
                            />
                        </div>
                        <div className="input">
                            <input
                                type="password"
                                placeholder="Password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                autoComplete="off"
                            />
                        </div>
                    </div>
                    {isOtp && action === "SignUp" ? (
                        <div className="Otp">
                            <p>OTP has been sent to the registered Email ID.</p>
                            <input
                                type="text"
                                name="otp"
                                placeholder="Enter 4-digit OTP"
                                value={formData.otp}
                                onChange={handleInputChange}
                                autoComplete="off"
                            />
                        </div>
                    ) : (
                        <div className="Submitcontainer">
                            <div
                                className={action === "Login" ? "submit gray" : "submit notGray"}
                                onClick={() => setAction("SignUp")}
                            >
                                Signup
                            </div>
                            <div
                                className={action === "SignUp" ? "submit gray" : "submit notGray"}
                                onClick={() => setAction("Login")}
                            >
                                Login
                            </div>
                        </div>
                    )}
                    <div className="formSubmit">
                        <button type="submit" className="btnSubmit">
                            {isOtp && action === "SignUp" ? "Submit OTP" : "Submit"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
