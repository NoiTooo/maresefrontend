import { useState } from "react"
import axios from "axios"
import styled from "styled-components"


export const UserRegister = () => {
    const [postEmail, setPostEmail ] = useState("")
    const [postPassword, setPostPassword] = useState("")
    const [postRePassword, setPostRePassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [succesTemporaryRegistration, setSuccesTemporaryRegistration] = useState(false)

    const onChangPosteEmail = (event) => setPostEmail(event.target.value)
    const onChangPostePassword = (event) => setPostPassword(event.target.value)
    const onChangePostRePassword = (event) => setPostRePassword(event.target.value)

    const onClickLogin = () => window.location.href = '../login/'

    const UserAuthorization = (e) => {
        e.preventDefault()

        axios.post(`${process.env.REACT_APP_HOST}/api/auth/users/`, 
        {
            'email' : postEmail, 
            'password' : postPassword,
            're_password': postRePassword
        },
        )
        .then((res) => {
            setSuccesTemporaryRegistration(true)
        })
        .catch(error =>{
            const errorResponse = `${error.request.response}`
            if (errorResponse.match(/既に存在します。/)){
                setErrorMessage("既に登録済みのユーザーです")
            } else if (errorResponse.match(/この項目は空にできません。/)) {
                setErrorMessage("すべての項目に入力されているかご確認ください。")
            } else if (errorResponse.match(/このパスワードは短すぎます/) || errorResponse.match(/このパスワードは一般的すぎます。/)) {
                setErrorMessage("パスワードは最低8文字以上で英半角大文字・英半角小文字・数字を組み合わせて設定してください。")
            } else if (errorResponse.match(/The two password fields didn't match./)) {
                setErrorMessage("パスワードが一致していません。")
            } else {
                setErrorMessage("登録エラーです。再度登録を行ってください。")
            }
        })
    }


    return(
        <>
        {succesTemporaryRegistration &&
        <ModalAuthenticationMailSent>
            <div className="message-box">
                <h2>認証メール送信</h2>
                <p>「{postEmail}」に認証メールを送信しました。</p>
                <p>メールに記載されているURLから認証を完了してください。</p>
            </div>
        </ModalAuthenticationMailSent>
        }
        <Container>
            <KeyIcon id="keyicon" src={`${process.env.PUBLIC_URL}/images/keyicon.png`} alt="Marese" />
            <h1>新規会員登録</h1>
            <form>
                <div className="form-control">
                    <Input placeholder="メールアドレス*" value={postEmail} onChange={onChangPosteEmail} />
                </div>
                <div className="form-control">
                    <Input placeholder="パスワード*" type="password" value={postPassword} onChange={onChangPostePassword} />
                </div>
                <div className="form-control">
                    <Input placeholder="確認用パスワード*" type="password" value={postRePassword} onChange={onChangePostRePassword} />
                </div>
                <button type="submit" onClick={UserAuthorization}>新規会員登録</button>
            </form>
            {
                errorMessage !== '' &&
                <p className="error-message">{errorMessage}</p>
                }
            <SupportMenu>
                <p onClick={onClickLogin}>ログインページに戻る</p>
           </SupportMenu>
        </Container>
    </>
    )
}

// styled-componets
const ModalAuthenticationMailSent = styled.div`
    width: 100%;
    height: 100%;
    position: fixed;
    background-color: rgba(128,128,128, 0.3);
    z-index: 1;
    text-align: center;
    .message-box {
        background-color: #FFFFFF;
        position: fixed;
        top: 20%;
        left: 35%;
        width: 30%;
        height: 50%;
        h2 {
            margin-top: 25%;
        }
    }
`
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

const SupportMenu = styled.div`
    display: flex;
    justify-content: center;
    p {
        cursor: pointer;
        margin: 40px 30px;
        font-size: 14px;
        color:#1976d2;
        border-bottom: solid 0.3px #1976d2;
    }
`