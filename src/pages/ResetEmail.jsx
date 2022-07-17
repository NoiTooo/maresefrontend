import { useState } from "react"
import { useCookies } from "react-cookie"
import axios from "axios"
import styled from "styled-components"


export const ResetEmail = () => {
    const jwtToken = useCookies()[0]['jwtToken']

    const [currentEmail, setCurrentEmail] = useState("")
    const [message, setMessage] = useState("")

    const onChangeCurrentEmail = (event) =>  setCurrentEmail(event.target.value)

    const PostCurrentEmail = (e) => {
        e.preventDefault()

        axios.post(`${process.env.REACT_APP_HOST}/api/auth/users/reset_email/`, 
        {
            'email': currentEmail,
        },
        {headers:{
            'Authorization': `JWT ${jwtToken}`
        }})
        .then((res) => {
            setMessage(`メールアドレス変更用URLが送付されました。本文に記載のURLから変更に進んでください。`)
        })
        .catch((error) => {
            setMessage("入力に誤りがあります。")
        })
    }

    return (
        <>
        <Container>
            <KeyIcon src={`${process.env.PUBLIC_URL}/images/keyicon.png`} alt="Marese" />
            <h1>メールアドレス変更</h1>
            <ErrorMessage>{ setMessage !== "" && <p>{message}</p>}</ErrorMessage>
            <form>
                <div className="form-control">
                    <Input type="email" placeholder="現在のメールアドレス*" value={currentEmail} onChange={onChangeCurrentEmail} />
                </div>
                <button onClick={PostCurrentEmail}>送信</button>
            </form>
        </Container>
        </>
    )
}

// styled componets
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