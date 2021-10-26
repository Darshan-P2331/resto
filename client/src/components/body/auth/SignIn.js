import axios from 'axios';
import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import Message from '../../utils/Message';

const initialState = {
    email: "",
    password: "",
    err: "",
    success: "",
  };

export default function SignIn() {
    const [user, setUser] = useState(initialState);
    const { email, password, err, success } = user;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value, err: "", success: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/user/login", { email, password });
      setUser({ ...user, err: "", success: res.data.msg });

      localStorage.setItem("firstLogin", true);

      window.location.href = "/";
    } catch (err) {
      err.response.data.msg &&
        setUser({ ...user, err: err.response.data.msg, success: "" });
    }
  };

  return (
    <div className="login-form-container active">

    <form onSubmit={handleSubmit}>
        <h3>login form</h3>
        {err && <Message variant='danger'>{err}</Message>}
        {success && <Message variant='success'>{success}</Message>}
        <input type="email" name="email" placeholder="enter your email" value={email} onChange={handleChange} className="box" />
        <input type="password" name="password" placeholder="enter your password" value={password} onChange={handleChange} className="box" />
        <button type="submit" className='btn' >login now</button>
        <p>forget password? <Link to="/forgot_password">click here</Link></p>
        <p>don't have an account? <Link to="/register">create one</Link></p>
    </form>

</div>
  );
}
