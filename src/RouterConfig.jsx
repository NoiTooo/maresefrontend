import { BrowserRouter, Routes, Route } from "react-router-dom"

// pages
import { NotFound } from "./components/NotFound"
import { Home } from "./pages/Home"
import { Login } from "./pages/Login"
import { UserRegister } from "./pages/UserRegister"
import { ResetEmail } from "./pages/ResetEmail" 
import { SetPassword } from "./pages/SetPassword"
import { MyPage } from "./pages/MyPage"
import { RegisterActivation } from "./components/RegisterActivation"
import { ResetPassword } from "./pages/ResetPassword"
import { ResetPasswordConfirm } from "./pages/ResetPasswordConfirm"

export const RouterConfig =() => {
    return (
      <>
       <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="login/" element={<Login />} />

          <Route exact path="register/" element={<UserRegister />} />
          <Route exact path="register/activate" element={<RegisterActivation />} />
          <Route exact path="register/reset-password" element={<ResetPassword />} />
          <Route exact path="register/set-password" element={<SetPassword />} />
          <Route exact path="register/reset-password/confirm" element={<ResetPasswordConfirm />} />
          <Route exact path="register/reset-email" element={<ResetEmail />} />

          <Route path="mypage/" element={<MyPage />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      </>
    );
  }