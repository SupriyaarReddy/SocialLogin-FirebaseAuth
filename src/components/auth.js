import React, { useState } from "react";
import Signin from "./signin";
import Signup from "./signup";
import { useUserContext } from "../context/userContext";
import { BsGoogle, BsGithub, BsMicrosoft } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa"




const Auth = () => {
    const [index, setIndex] = useState(false);
    const toggleIndex = () => {
        setIndex((prevState) => !prevState);
    };
    const { signInWithGithub, signInWithMicrosoft, signInWithGoogle, signInWithFacebook, } = useUserContext();

    return (
        <div className="container">
            {!index ? <Signin /> : <Signup />}
            <div className="container-buttons ">
            
            <button className="auth-buttonG" onClick={signInWithGoogle}>
                <BsGoogle className="icon" />
            </button>
            
            <button className="auth-buttonM" onClick={signInWithMicrosoft}> {/* Add Microsoft button */}
                <BsMicrosoft className="icon" />
              
            </button>
                <button className="auth-buttonI" onClick={signInWithGithub}>
                <BsGithub className="icon" />
                 
            </button>
                <button className="auth-buttonL" onClick={signInWithFacebook}>
                    <FaFacebook className="icon" />
              
                </button>
            </div>
            <p onClick={toggleIndex}>
                {!index ? "New user? Click here " : "Already have an acount?"}
            </p>
        </div>
    );
};

export default Auth;