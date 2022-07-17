import { useEffect, useState } from "react"
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import styled from "styled-components"

export const Login = () => {
    const navigate = useNavigate()

    const [postEmail, setPostEmail ] = useState("")
    const [postPassword, setPostPassword] = useState("")
    const [catchError, setCatchError] = useState(false)

    const jwtToken = `${useCookies()[0].jwtToken}`
    const [cookies, setCookie, removeCookie] = useCookies(["jwtToken"])

    useEffect(() => {
        if (jwtToken !== '') {
        axios.get(`${process.env.REACT_APP_HOST}/api/auth/users/me`,
        {headers: {
            'Authorization': `JWT ${jwtToken}`
        }})
        .then((res) => {
            navigate('/mypage')
        })
        } else {
        removeCookie("jwtToken")
        }
    },[])

    const onChangPosteEmail = (event) => {
        return setPostEmail(event.target.value)
      };
    
    const onChangPostePassword = (event) => {
        return setPostPassword(event.target.value)
    }

    const UserAuthorization = (e) => {
        e.preventDefault()

        axios.post(`${process.env.REACT_APP_HOST}/api/auth/jwt/create`, {email : postEmail, password : postPassword},
        )
        .then((res) => {
            setCookie("jwtToken", res.data.access)
            navigate('/mypage')
        })
        .catch(error =>{
            setCatchError(true)
        })
    }

    const onClickUserRegister = () => {
        navigate('/register')
    }
    const onClickResetPassword = () => {
        navigate('/register/reset-password')
    }

    return(
        <Container>
            <KeyIcon src={`${process.env.PUBLIC_URL}/images/keyicon.png`} alt="Marese" />
            <h1>ログイン</h1>
            <form>
                <div className="form-control">
                    <Input placeholder="メールアドレス*" value={postEmail} onChange={onChangPosteEmail} />
                </div>
                <div className="form-control">
                    <Input placeholder="パスワード*" type="password" value={postPassword} onChange={onChangPostePassword} />
                </div>
                <button type="submit" onClick={UserAuthorization}>LOGIN</button>
                {
                catchError && 
                <ErrorMessage className="error-message">メールアドレスかパスワードが間違っています</ErrorMessage>
                }
            </form>
            <SupportMenu>
                <p onClick={onClickResetPassword}>パスワードを忘れた方</p>
                <p onClick={onClickUserRegister}>ユーザー新規登録</p>
           </SupportMenu>
        </Container>
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