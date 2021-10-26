import axios from "axios";
import React, { useState } from "react";
import Message from "../../utils/Message";
import { isEmail } from "../../utils/Validation";

const initialState = {
  email: "",
  err: "",
  success: "",
};

export default function ForgotPassword() {
  const [data, setData] = useState(initialState);

  const { email, err, success } = data;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value, err: "", success: "" });
  };

  const forgotPassword = async (e) => {
    e.preventDefault()
    if (!isEmail(email))
      return setData({ ...data, err: "Invalid email.", success: "" });
    try {
      const res = await axios.post("/user/forgot", { email });
      return setData({ ...data, err: "", success: res.data.msg });
    } catch (err) {
      err.response.data.msg &&
        setData({ ...data, err: err.response.data.msg, success: "" });
    }
  };

  return (
    <div className="login-form-container active">
      <form onSubmit={forgotPassword}>
        <h3>forgot password</h3>
        {err && <Message variant="danger">{err}</Message>}
        {success && <Message variant="success">{success}</Message>}
        <input
          type="email"
          name="email"
          placeholder="enter your email"
          value={email}
          onChange={handleChange}
          className="box"
        />
        <button type="submit" className="btn">
          reset password
        </button>
      </form>
    </div>
  );
}
