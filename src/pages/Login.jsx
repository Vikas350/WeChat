import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import logo from '../img/WeChat.png';

const Login = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/")
    } catch (err) {
      setErr(true);
    }
  };
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo"><img className="log" src={logo} alt=""/></span>
        <span className="title">Login</span>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Enter Your email" />
          <input type="password" placeholder="Enter Password" />
          <button>Sign in</button>
          {err && <span className="er">* Wrong user Email or Password</span>}
        </form>
        <p>You don't have an account? <Link to="/register" className="link">Register</Link></p>
      </div>
    </div>
  );
};

export default Login;