import { useEffect, useState } from "react"
import { useCookies } from "react-cookie"
import axios from "axios"

import "../styles/MyPage.css"

// components
import { Navigation } from "../components/Navigation"
import { Header } from "../components/Header"

export const MyPage = () => {
    const jwtToken = `${useCookies()[0].jwtToken}`
    const [cookies, setCookie, removeCookie] = useCookies(["jwtToken"])

    // userInfo
    const [email, setEmail] = useState("")
    const [userName, setUserName] = useState("")
    const [lastName, setLastName] = useState("")
    const [firstName, setFirstName] = useState("")
    const [userImage, setUserImage] = useState("")

    // navbar
    const [selectMenu, setSelectMenu] = useState("None")
    const [catchError, setCatchError] = useState(false)
    const [updateUserName, setpdateUserName] = useState(userName)

    useEffect(() => {
        if (jwtToken === ''){
            removeCookie("jwtToken")
        }
        axios.get(`${process.env.REACT_APP_HOST}/api/auth/users/me`,
        {headers: {
            'Authorization': `JWT ${jwtToken}`
        }})
        .then((res) => {
            setEmail(res.data.email)
            setUserName(res.data.username)
            setLastName(res.data.last_name)
            setFirstName(res.data.first_name)
            setUserImage(res.data.userimage)
        })
        .catch((error) => {
            window.location.href = '../login'
        })
    })

    // updateUser
    const UpdateUserInfo = () => setSelectMenu("updateUser")
    const onChangeUpdateUserName = (event) => setpdateUserName(event.target.value)
    
    const onClickUpdateUserInfo = () => {
        axios.patch(`${process.env.REACT_APP_HOST}/api/auth/users/me/`, 
        {'username': updateUserName},
        {headers:{
            'Authorization': `JWT ${jwtToken}`
        }})
        .catch((error) => {
            setCatchError(true)
        })
    }

    // resetPassword
    const SetPassword = () =>  '../register/set-password'
    // resetEmail
    const ResetEmail = () => window.location.href = '../register/reset-email'

    return (
        <>
        <Header />
        <main>
            <nav><Navigation setSelectMenu={setSelectMenu}/></nav>
            <div className="container">
                {selectMenu==="userInfo" && 
                    <div>
                        <p>?????????????????????:{email}</p>
                        <p>???????????????:{userName}</p>
                        <p>?????????{lastName} {firstName}</p>
                        <p onClick={UpdateUserInfo}>????????????????????????</p>
                        <p onClick={SetPassword}>??????????????????????????????</p>
                        <p onClick={ResetEmail}>????????????????????????????????????</p>
                        <img src={`${userImage}`} alt="Marese" />

                    </div>
                }

                {selectMenu==="updateUser" && 
                    <div>
                        <form>
                            <p>?????????????????????:{email}</p>
                            <p>???????????????:<input type="text" placeholder={userName} value={updateUserName} onChange={onChangeUpdateUserName} /></p>
                            <button type="submit" onClick={onClickUpdateUserInfo}>??????</button>
                        </form>
                    </div>
                }

            </div>
        </main>
        </>
    )
}