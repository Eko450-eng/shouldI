'use client'
import { useRouter } from "next/navigation";
import { ToggleButton, ToggleButtonGroup, Button } from "@mui/material";
import { TextField } from '@mui/material'
import { useState } from 'react'
import { login } from './(logic)'
import pb from '../(pb_functions)'
import '../../styles/globals.scss'

interface ImageType {
  // To-Do Figure this out
  image: any
}

export default function Login() {
  const [userName, setUserName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setpassword] = useState<string>("")
  const [confirmPassword, setConfirmPassword] = useState<string>("")
  const [image, setImage] = useState<ImageType | null>(null)
  const [loginView, setLoginView] = useState<string>("login")
  const router = useRouter()

  pb.collection('questions').subscribe('*', function() {
    router.refresh()
  });

  const loginViewToggle = (e: React.MouseEvent<HTMLElement>, v: string) => setLoginView(v)
  const loginHandler = () => login(userName, password).then(() => router.push("/"))
  const signupHandler = async () => {
    const formData = new FormData()
    formData.append("username", userName)
    formData.append("email", email)
    formData.append("emailVisibility", "true")
    formData.append("password", password)
    formData.append("passwordConfirm", confirmPassword)
    formData.append("name", userName)
    formData.append("image", image ? image.image : null)
    await pb.collection("users").create(formData)
  }



  return (
    <div className="flex-center">
      <form className="flex-center" onSubmit={(e) => e.preventDefault()}>

        <p>Please {loginView}</p>
        {loginView == "register" &&

          <TextField
            sx={{ input: { color: "white" }, label: { color: "white" } }}
            className="white"
            onChange={(v) => setEmail(v.target.value)}
            value={email}
            label="Email" variant="outlined" />
        }
        <TextField
          sx={{ input: { color: "white" }, label: { color: "white" } }}
          onChange={(v) => setUserName(v.target.value)}
          value={userName}
          label="Username" variant="outlined" />
        <TextField
          sx={{ input: { color: "white" }, label: { color: "white" } }}
          onChange={(v) => setpassword(v.target.value)}
          value={password}
          type="password"
          label="Password" variant="outlined" />


        {loginView == "register" ?
          <>
            <TextField
              sx={{ input: { color: "white" }, label: { color: "white" } }}
              onChange={(v) => setConfirmPassword(v.target.value)}
              value={confirmPassword}
              type="password"
              label="Confirm password" variant="outlined" />

            <Button
              className="btn"
              variant="contained"
              component="label"
            >
              Upload first image
              {/* To-Do Figure this out */}
              <input type="file" hidden name="file" onChange={(v: any) => setImage({ image: v.target.files[0] })} />
            </Button>
            <button className="btn" onClick={() => signupHandler()} >Register</button>
          </>
          :
          <button className="btn" onClick={() => loginHandler()} >Login</button>
        }
      </form>

      {/* To-Do Toggle between login and register view */}
      <ToggleButtonGroup
        value={loginView}
        onChange={loginViewToggle}
        exclusive
        aria-label="Platform"
        color="primary"
      >
        <ToggleButton
          value="login">Login</ToggleButton>
        <ToggleButton value="register">Register</ToggleButton>
      </ToggleButtonGroup>
    </div >
  )
}
