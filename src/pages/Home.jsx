export const Home = () => {
    const onClickLogin = () => {
        window.location.href = 'login/'
    }

    return(
        <>
        <h1>Home</h1>
        <button onClick={onClickLogin}>Login</button>
        </>
    )
}