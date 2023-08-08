import React, { useRef } from "react";
import { useUserContext } from "../context/userContext";

const Signin = () => {
    const emailRef = useRef();
    const psdRef = useRef();
    
    // const userContext = useUserContext();
    // console.log("User Context:", userContext);

    const { signInUser, forgotPassword } = useUserContext();

    // console.log("signInUser:", signInUser);
    // console.log("forgotPassword:", forgotPassword);

    const onSubmit = (e) => {
        e.preventDefault();
        const email = emailRef.current.value;
        const password = psdRef.current.value;
        if (email && password) signInUser(email, password);
    };

    const forgotPasswordHandler = () => {
        const email = emailRef.current.value;
        if (email)
            forgotPassword(email).then(() => {
                emailRef.current.value = "";
            });
    };

    return (
        <div className="form">
            <h2> Login </h2>
            <form onSubmit={onSubmit}>
                <input placeholder="Email" type="email" ref={emailRef} />
                <input placeholder="Password" type="password" ref={psdRef} />
                <button type="submit">Sign In</button>
            </form>
            <p className="paragraph"  onClick={forgotPasswordHandler}>Forgot Password?</p>
            <div className="divider">
                <hr />
                <h9>Or log in with</h9>
            </div>
        </div>
    );
};

export default Signin;