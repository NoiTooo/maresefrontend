import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import queryString from 'query-string'
import styled from "styled-components"
import axios from "axios"


export const ResetPasswordConfirm = () => {
    const location = useLocation().search
    const query = queryString.parse(location)


    const [uid, setUid] = useState(query['uid'])
    const [token, setToken] = useState(query['token'])
    const [newPassword, setNewPassword] = useState("")
    const [reNewPassword, setReNewPassword] = useState("")
    const [requestStatus, setRequestStatus] = useState("")
    const [catchError, setCatchError] = useState(false)


    const onChangNewPassword = (event) =>  setNewPassword(event.target.value)
    const onChangReNewPassword = (event) =>  setReNewPassword(event.target.value)
    

    const PostNewPassword = (e) => {
        e.preventDefault()

        axios.post(`${process.env.REACT_APP_HOST}/api/auth/users/reset_password_confirm/`, 
        {
            'uid': uid,
            'token': token,
            'new_password': newPassword,
            're_new_password':reNewPassword,
        })
        .then((res) => {
            setRequestStatus(`${res.status}`)
        })
        .catch((error) => {
            setCatchError(true)
        })
    }

    useEffect(() => {
        if (requestStatus === "204") {
            window.location.href = "../../login"
        }
    },[requestStatus])

    return (
        <>
        <Container>
            <KeyIcon src={`${process.env.PUBLIC_URL}/images/keyicon.png`} alt="Marese" />
            <h1>パスワード再設定</h1>
            <form>
                <div className="form-control">
                    <Input type="password" placeholder="新パスワード" value={newPassword} onChange={onChangNewPassword} />
                </div>
                <div className="form-control">
                    <Input type="password" placeholder="(再入力)新パスワード" value={reNewPassword} onChange={onChangReNewPassword} />
                </div>
                {
                catchError && 
                <ErrorMessage className="error-message">パスワードが一致していません。</ErrorMessage>
                }

                <button onClick={PostNewPassword}>送信</button>
            </form>
        </Container>
        </>
    )
}

// styled-componets
const Container = styled.div`
    width: 60%;
    margin: auto;
    text-align: center;    
    h1 {
        font-size: 24px;
        font-weight: normal;
    }
    form > button {
        cursor: pointer;
        margin-top: 30px;
        width: 35%;
        height: 40px;
        font-size: 14px;
        border: none;
        background-color: #1976d2;
        color: #f0fff0;
        border-radius: 10px;
        filter: drop-shadow(1px 2px 5px rgba(0,0,0,0.3));
    }
`

const KeyIcon = styled.img`
    margin-top:80px;    
`

const Input = styled.input`
    width: 35%;
    height: 50px;
    font-size: 14px;
    border: solid 0.5px #dcdcdc;
    margin: 10px auto;
`

const ErrorMessage = styled.p`
    color: #dc143c;
    font-size: 14px;
    margin: 20px auto;    
`