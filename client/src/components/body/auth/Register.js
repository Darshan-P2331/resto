import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Message from '../../utils/Message';
import { isEmail, isEmpty, isLength, isMatch } from '../../utils/Validation';

const initialState = {
    name: "",
    email: "",
    password: "",
    cf_password: "",
    err: "",
    success: "",
  };

export default function Register() {
    const [user, setUser] = useState(initialState);

  const { name, email, password, cf_password, err, success } = user;


  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value, err: "", success: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEmpty(name) || isEmpty(password))
      return setUser({
        ...user,
        err: "Please fill in all fields",
        success: "",
      });

    if (!isEmail(email))
      return setUser({
        ...user,
        err: "Invalid email.",
        success: "",
      });

    if (isLength(password))
      return setUser({
        ...user,
        err: "Password must be atleast 8 characters.",
        success: "",
      });

    if (!isMatch(password, cf_password))
      return setUser({
        ...user,
        err: "Password did not match.",
        success: "",
      });
    try {
      const res = await axios.post("/user/register", {
        name,
        email,
        password,
      });

      setUser({ ...user, err: "", success: res.data.msg });
    } catch (err) {
      err.response.data.msg &&
        setUser({ ...user, err: err.response.data.msg, success: "" });
    }
  };

  return (
    <div className="login-form-container active">

    <form onSubmit={handleSubmit}>
        <h3>register form</h3>
        {err && <Message variant='danger'>{err}</Message>}
        {success && <Message variant='success'>{success}</Message>}
        <input type="text" name='name' value={name} onChange={handleChange} placeholder="Enter your name" className="box" />
        <input type="email" name='email' value={email} onChange={handleChange} placeholder="Enter your email" className="box" />
        <input type="password" name='password' value={password} onChange={handleChange} placeholder="Enter your password" className="box" />
        <input type="password" name='cf_password' value={cf_password} onChange={handleChange} placeholder="Enter your confirm password" className="box" />
        <button type="submit" className='btn' >Register</button>
        <p>already have an account? <Link to="/signin">click here</Link></p>
    </form>

</div>
  );
}
