import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import {GlobalState} from '../../../GlobalState'
import Message from '../../utils/Message';
import { isLength, isMatch } from '../../utils/Validation';

const initialState = {
    name: "",
    email: "",
    password: "",
    cf_password: "",
    err: "",
    success: "",
  };

export default function Profile(props) {
    const state = useContext(GlobalState)
    const [user] = state.userAPI.user
    const [history,setHistory] = state.userAPI.history;
    const [isAdmin] = state.userAPI.isAdmin
    const [users, setUsers] = state.userAPI.users
    const [token] = state.token
    const [data, setData] = useState(initialState);
  const [avatar, setAvatar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [callback, setCallback] = useState(false);

  const { name, password, cf_password, err, success } = data;

  useEffect(() => {
    if (isAdmin) {
      const getAllUsers = async () => {
          const res = await axios.get('/user/all_info',{
              headers: {Authorization: token}
          })
          setUsers(res.data)
      }
      getAllUsers()
    }else{
      const getOrders = async () => {
        const res = await axios.get('/api/payment',{
          headers: {Authorization: token}
      })
      setHistory(res.data)
      }
      getOrders()
    }
  }, [token, isAdmin, setUsers,setHistory]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value, err: "", success: "" });
  };

  const changeAvatar = async (e) => {
    e.preventDefault();
    try {
      const file = e.target.files[0];

      if (!file)
        return setData({
          ...data,
          err: "No files were uploaded.",
          success: "",
        });

      if (file.size > 1024 * 1024)
        return setData({ ...data, err: "Size is too large.", success: "" });

      if (file.type !== "image/jpeg" && file.type !== "image/png")
        return setData({
          ...data,
          err: "File format is incorrect.",
          success: "",
        });

      let formData = new FormData();
      formData.append("file", file);

      setLoading(true);
      const res = await axios.post("/api/upload_avatar", formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: token,
        },
      });

      setLoading(false);
      setAvatar(res.data.url);
    } catch (err) {
      setData({ ...data, err: err.response.data.msg, success: "" });
    }
  };

  const updateInfo = () => {
    try {
      axios.patch(
        "/user/update",
        {
          name: name ? name : user.name,
          avatar: avatar ? avatar : user.avatar,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setData({ ...data, err: "", success: "Update Success!" });
    } catch (err) {
      setData({ ...data, err: err.response.data.msg, success: "" });
    }
  };

  const updatePassword = () => {
    if (isLength(password))
      return setData({
        ...data,
        err: "Password must be at least 8 characters.",
        success: "",
      });
    if (!isMatch(password, cf_password))
      return setData({ ...data, err: "Password did not match.", success: "" });
    try {
      axios.post(
        "/user/reset",
        { password },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setData({ ...data, err: "", success: "Update Success!" });
    } catch (err) {
      setData({ ...data, err: err.response.data.msg, success: "" });
    }
  };

  const handleUpdate = () => {
    if (name || avatar) updateInfo();
    if (password) updatePassword();
  };

  const handleDelete = async (id) => {
    try {
      if (user._id !== id) {
        if (window.confirm('Are you sure you want to delete this account?')) {
          setLoading(true)
          await axios.delete(`/user/delete/${id}`,{
            headers: {Authorization: token}
          })
          setLoading(false)
          setCallback(!callback)
        }
      }
      
    } catch (err) {
      setData({...data,err: err.response.data.msg,success: ''})
    }
  }

    return (
        <>
      <div>
        {err && <Message variant='danger'>{err}</Message>}
        {success && <Message variant='success'>{success}</Message>}
        {loading && <h3>Loading.....</h3>}
      </div>
      <div className="profile_page">
        <div className="col-left">
          <h2>{isAdmin ? "Admin Profile" : "User Profile"}</h2>
          <div className="avatar">
            <img src={avatar ? avatar : user.avatar} alt="" loading="lazy" />
            <span>
              <i className="fas fa-camera"></i>
              <p>Change</p>
              <input
                type="file"
                name="file"
                id="file_upload"
                onChange={changeAvatar}
              />
            </span>
          </div>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Your name"
              defaultValue={user.name}
              onChange={handleChange}
            />
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Your email address"
              defaultValue={user.email}
              disabled
            />
            <label htmlFor="password">New Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Your password"
              value={password}
              onChange={handleChange}
            />
            <label htmlFor="cf_password">Confirm New Password</label>
            <input
              type="password"
              name="cf_password"
              id="cf_password"
              placeholder="Confirm password"
              value={cf_password}
              onChange={handleChange}
            />
            <button className='btn' disabled={loading} onClick={handleUpdate}>
              Update
            </button>
          </div>
        </div>
        <div className="col-right">
          <h2>{isAdmin ? "Users" : "My Orders"}</h2>
          <div style={{ overflowX: "auto" }}>
            <table className="customers">
              <thead>
                {
                  isAdmin ? 
                <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Admin</th>
                <th>Action</th>
                </tr>
                :
                <tr>
                  <th>ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th>ACTIONS</th>
                </tr>
                }
              </thead>
              {
                isAdmin ?
              <tbody>
                {
                  users.map(user => (
                    <tr key={user._id}>
                      <td>{user._id}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.role === 1 ?
                      <i className="fas fa-check" title='Admin'></i>
                      :
                      <i className="fas fa-times" title='User'></i>
                      }</td>
                      <td>
                        <Link to={`/edit_user/${user._id}`}>
                          <i className="fas fa-edit" title='Edit'></i>
                        </Link>
                        <i className="fas fa-trash-alt" title='Remove' onClick={() => handleDelete(user._id)}></i>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
              :
              <tbody>
            {history.map((order) => (
              <tr key={order._id}>
                  <td>{order._id}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>${order.totalPrice}</td>
                <td>{order.isPaid ? order.paidAt.substring(0, 10) : "No"}</td>
                <td>
                  {order.isDelivered
                    ? order.deliveredAt.substring(0, 10)
                    : "No"}
                </td>
                <td>
                  <button className="btn" onClick={() => props.history.push(`/order/${order._id}`)}>Details</button>
                </td>
              </tr>
            ))}
          </tbody>
              }
            </table>
          </div>
        </div>
      </div>
    </>
    )
}
