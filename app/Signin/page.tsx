'use client'
import { useRouter } from "next/navigation";
import { useState } from 'react'
import { login } from './(logic)'
import { MantineProvider, Input, Button } from '@mantine/core'
import '../../styles/globals.scss'
import pb from '../(pb_functions)'

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
    setTimeout(() => {
      router.refresh()
    }, 250);
  });


  const loginHandler = () => login(userName, password).then(() => router.push("/"))
  const signupHandler = async () => {
    const formData = new FormData()
    formData.append("username", userName)
    formData.append("email", email)
    formData.append("emailVisibility", "true")
    formData.append("password", password)
    formData.append("name", userName)
    formData.append("image", image ? image.image : null)
    await pb.collection("users").create({
      "username": userName,
      "email": email,
      "emailVisibility": true,
      "password": password,
      "passwordConfirm": confirmPassword,
      "name": userName,
      "role": 1
    })
  }


  return (
    <div className="flex-center">
      <MantineProvider theme={{
        colorScheme: "dark"
      }} withNormalizeCSS withGlobalStyles>

        <form className="flex-center" onSubmit={(e) => e.preventDefault()}>
          <p>Please {loginView}</p>
          {loginView == "register" &&

            <Input
              className="white"
              onChange={(v) => setEmail(v.target.value)}
              value={email}
              placeholder="Email"
            />
          }
          <Input
            onChange={(v) => setUserName(v.target.value)}
            value={userName}
            placeholder="Username"
          />
          <Input
            onChange={(v) => setpassword(v.target.value)}
            value={password}
            type="password"
            placeholder="Password"
          />


          {loginView == "register" ?
            <>
              <Input
                onChange={(v) => setConfirmPassword(v.target.value)}
                value={confirmPassword}
                type="password"
                placeholder="Confirm password"
              />

              {/* <Button */}
              {/*   component="label" */}
              {/* > */}
              {/*   Upload first image */}
              {/*   <input type="file" hidden name="file" onChange={(v: any) => setImage({ image: v.target.files[0] })} /> */}
              {/* </Button> */}
              <Button onClick={() => signupHandler()} >Register</Button>
            </>
            :
            <Button onClick={() => loginHandler()} >Login</Button>
          }
        </form>

        <div
          className="flex-center row"
        >
          <Button
            value="register"
            color={loginView === "register" ? "green" : "orange"}
            onClick={() => setLoginView(loginView === "register" ? "login" : "register")}>
            {loginView === "register" ? "Already have an account?" : "New User?"}
          </Button>
        </div>
      </MantineProvider>
    </div >
  )
}
