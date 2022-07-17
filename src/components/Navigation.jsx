import "../styles/Navigation.css"

export const Navigation = (props)=> {
    const {setSelectMenu} = props

    const onClickUserInfo = () => {
        setSelectMenu("userInfo")
    }

    return (
        <>
        <ul>
            <li onClick={onClickUserInfo}>ユーザー情報</li>
        </ul>
        </>
    )
}