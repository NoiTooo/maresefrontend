import { useState } from "react"
import { useCookies } from "react-cookie"
import styled from "styled-components"
import axios from "axios"


export const SetPassword = () => {
    const jwtToken = useCookies()[0]['jwtToken']

    const [newPassword, setNewPassword] = useState("")
    const [reNewPassword, setReNewPassword] = useState("")
    const [currentPassword, setCurrentPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState(false)

    const onChangCurrentPassword = (event) =>  setCurrentPassword(event.target.value)
    const onChangNewPassword = (event) =>  setNewPassword(event.target.value)
    const onChangReNewPassword = (event) =>  setReNewPassword(event.target.value)
    

    const PostNewPassword = (e) => {
        e.preventDefault()

        axios.post(`${process.env.REACT_APP_HOST}/api/auth/users/set_password/`, 
        {
            'new_password': newPassword,
            're_new_password':reNewPassword,
            'current_password':currentPassword
        },
        {headers:{
            'Authorization': `JWT ${jwtToken}`
        }})
        .then((res) =>{
            window.location.href = '../../mypage'
        })
        .catch((error) => {
            console.log(error)
        })
    }

    return (
        <>
        <Container>
            <KeyIcon src={`${process.env.PUBLIC_URL}/images/keyicon.png`} alt="Marese" />
            <h1>パスワード再設定</h1>
            <form>
                {setErrorMessage || <p>入力エラーがあります</p>}
                <div className="form-control">
                    <Input type="password" placeholder="現在のパスワード*" value={currentPassword} onChange={onChangCurrentPassword} />
                </div>
                <div className="form-control">
                    <Input type="password" placeholder="新パスワード*" value={newPassword} onChange={onChangNewPassword} />
                </div>
                <div className="form-control">
                    <Input type="password" placeholder="（再入力）新パスワード*" value={reNewPassword} onChange={onChangReNewPassword} />
                </div>
                <button onClick={PostNewPassword}>送信</button>
            </form>
        </Container>
        </>
    )
}

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