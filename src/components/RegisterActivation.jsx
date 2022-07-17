import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import queryString from 'query-string'
import axios from "axios"

export const RegisterActivation = () => {
    const location = useLocation().search
    const query = queryString.parse(location)

    const [uid, setUid] = useState(query['uid'])
    const [token, setToken] = useState(query['token'])
    const [requestStatus, setRequestStatus] = useState("")
    console.log(requestStatus)

    useEffect(() => {
        console.log(uid)
        console.log(token)
        axios.post(`${process.env.REACT_APP_HOST}/api/auth/users/activation/`, 
        {'uid': uid, 'token': token})
        .then((res) => {
            setRequestStatus(`${res.status}`)
        })
    },[])

    useEffect(() => {
        if (requestStatus === "204") {
            window.location.href = "../../login"
        }
    },[requestStatus])

    return (
        <>
        {requestStatus==="204"
        ?
        <h1>認証成功</h1>
        :
        <h1>認証失敗</h1>
        }
        </>
    )
}