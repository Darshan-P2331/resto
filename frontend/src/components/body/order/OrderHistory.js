import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useContext } from 'react';
import { GlobalState } from '../../../GlobalState';

export default function OrderHistory(props) {
    const state = useContext(GlobalState);
  const [history,setHistory] = state.userAPI.history;
  const [isAdmin] = state.userAPI.isAdmin
  const [token] = state.token

  useEffect(() => {
    if (token) {
        const getHistory = async () => {
            if (isAdmin) {
                const res = await axios.get('/api/all_payment',{
                    headers: {Authorization: token}
                })
                setHistory(res.data)
            }
            
        }
        getHistory()
    }
}, [token, isAdmin,setHistory])

    return (
        <section>
            <table className="customers">
            <thead>
            <tr>
                  <th>ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th>ACTIONS</th>
                </tr>
            </thead>
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
            </table>
        </section>
    )
}
