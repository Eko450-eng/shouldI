'use client'
import { useRouter } from "next/navigation";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { TextField } from '@mui/material'
import { useState } from 'react'
import { login, signup } from './(logic)'
import '../../styles/globals.scss'

export default function Login() {
  const [userName, setUserName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setpassword] = useState<string>("")
  const [confirmPassword, setConfirmPassword] = useState<string>("")
  const [loginView, setLoginView] = useState<string>("login")
  const router = useRouter()

  const loginViewToggle = (e: React.MouseEvent<HTMLElement>, v: string) => setLoginView(v)
  const loginHandler = () => login(userName, password).then(() => router.push("/"))
  const signupHandler = () => signup({
    "username": userName,
    "email": email,
    "emailVisibility": true,
    "password": password,
    "passwordConfirm": confirmPassword,
    "name": userName,
  })

  return (
    <div className="flex-center">
      <form className="flex-center" onSubmit={(e) => e.preventDefault()}>

        <p>Please {loginView}</p>
        {loginView == "register" &&

          <TextField
            sx={{ label: { color: "white" } }}
            className="white"
            onChange={(v) => setEmail(v.target.value)}
            value={email}
            label="Email" variant="outlined" />
        }
        <TextField
          sx={{ label: { color: "white" } }}
          onChange={(v) => setUserName(v.target.value)}
          value={userName}
          label="Username" variant="outlined" />
        <TextField
          sx={{ label: { color: "white" } }}
          onChange={(v) => setpassword(v.target.value)}
          value={password}
          type="password"
          label="Password" variant="outlined" />

        {loginView == "register" ?
          <>
            <TextField
              sx={{ label: { color: "white" } }}
              onChange={(v) => setConfirmPassword(v.target.value)}
              value={confirmPassword}
              type="password"
              label="Confirm password" variant="outlined" />
            <button className="btn" onClick={() => signupHandler()} >Register</button>
          </>
          :
          <button className="btn" onClick={() => loginHandler()} >Login</button>
        }
      </form>

      {/* Toggle between login and register view */}
      <ToggleButtonGroup
        value={loginView}
        onChange={loginViewToggle}
        exclusive
        aria-label="Platform"
      >
        <ToggleButton value="login">Login</ToggleButton>
        <ToggleButton value="register">Register</ToggleButton>
      </ToggleButtonGroup>
    </div>
  )
}
