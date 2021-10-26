import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Message from "../../utils/Message";
import { isLength, isMatch } from "../../utils/Validation";

const initialState = {
  password: "",
  cf_password: "",
  err: "",
  success: "",
};

export default function ResetPassword() {
  const { token } = useParams();
  const [data, setData] = useState(initialState);

  const { password, cf_password, err, success } = data;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value, err: "", success: "" });
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (isLength(password))
      return setData({
        ...data,
        err: "Password must be at least 8 characters.",
        success: "",
      });
    if (!isMatch(password, cf_password))
      return setData({ ...data, err: "Password did not match.", success: "" });
    try {
      const res = await axios.post(
        "/user/reset",
        { password },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      return setData({ ...data, err: "", success: res.data.msg });
    } catch (err) {
      err.response.data.msg &&
        setData({ ...data, err: err.response.data.msg, success: "" });
    }
  };

  return (
    <div className="login-form-container active">
      <form onSubmit={handleResetPassword}>
        <h3>reset password</h3>
        {err && <Message variant="danger">{err}</Message>}
        {success && <Message variant="success">{success}</Message>}
        <input
          type="password"
          name="password"
          placeholder="enter your password"
          value={password}
          onChange={handleChange}
          className="box"
        />
        <input
          type="password"
          name="cf_password"
          placeholder="confirm your password"
          value={cf_password}
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
