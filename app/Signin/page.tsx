'use client'
import { useRouter } from "next/navigation";
import { useState } from 'react'
import { Input, Button, FileButton } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import '../../styles/globals.scss'
import pb from '../(pb_functions)'

export default function Login() {
  const [userName, setUserName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setpassword] = useState<string>("")
  const [confirmPassword, setConfirmPassword] = useState<string>("")
  const [image, setImage] = useState<File | null>(null)
  const [loginView, setLoginView] = useState<string>("login")

  const router = useRouter()

  pb.collection('questions').subscribe('*', function() {
    setTimeout(() => {
      router.refresh()
    }, 250);
  });

  const loginHandler = () => {
    pb.collection("users").authWithPassword(userName, password)
      .then(() => {
        showNotification({
          title: "Welcome",
          message: "You have been successfully logged in",
          color: "green"
        })
        setTimeout(() => router.push("/"), 250)
      }).catch(() => {
        showNotification({
          title: "Oops",
          message: "Something went wrong please try again",
          color: "red"
        })
      })
  }

  const signupHandler = async () => {
    const formData = new FormData()
    formData.append("username", userName)
    formData.append("email", email)
    formData.append("emailVisibility", "true")
    formData.append("password", password)
    formData.append("passwordConfirm", confirmPassword)
    formData.append("name", userName)
    formData.append("role", "1")
    if (image) formData.append("image", image as Blob)

    await pb.collection("users").create(formData)
      .then(async () => {
        await pb.collection('users').requestVerification(email);
        loginHandler()
      }).catch(() => {
        showNotification({
          title: "Oops",
          message: "Something went wrong please try again",
          color: "red"
        })
      })
  }


  return (
    <div className="flex-center">
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


        {loginView == "register" &&
          <>
            <Input
              onChange={(v) => setConfirmPassword(v.target.value)}
              value={confirmPassword}
              type="password"
              placeholder="Confirm password"
            />


            <FileButton onChange={setImage} accept="image/png,image/jpeg">
              {(props) => <Button {...props}>Upload profile picture</Button>}
            </FileButton>


          </>
        }
        <Button sx={theme => ({ backgroundColor: theme.colors.nord_success[4] })}
          onClick={() => loginView === "register" ? signupHandler() : loginHandler()}
          type="submit"
        >
          {loginView === "register" ? "Create account" : "Login"}
        </Button>
      </form>

      <div
        className="flex-center row"
      >
        <Button
          value="register"
          onClick={() => setLoginView(loginView === "register" ? "login" : "register")}>
          {loginView === "register" ? "Already have an account?" : "New User?"}
        </Button>
      </div>
    </div >
  )
}
