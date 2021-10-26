import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Message from '../../utils/Message'

export default function ActivateEmail() {
    const {activation_token} = useParams()
    const [err, setErr] = useState('')
    const [success, setSuccess] = useState('')

    useEffect(() => {
        if(activation_token){
            const activationEmail = async () => {
                try {
                    const res = await axios.post('/user/activation',{activation_token})
                    setSuccess(res.data.msg)
                } catch (err) {
                    err.response.data.msg && setErr(err.response.data.msg)
                }
            }
            activationEmail()
        }
    }, [activation_token])

    return (
        <div className='login-form-container active'>
            <form>
            {err && <Message variant='danger'>{err}</Message>}
            {success && <Message variant='success'>{success}</Message>}
            </form>
        </div>
    )
}
