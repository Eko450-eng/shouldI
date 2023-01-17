import { Button, Avatar, Drawer, Typography } from "@mui/material";
import { logout } from "../../(pb_functions)";
import { useRouter } from 'next/navigation'

export default function Buttons() {
  const router = useRouter()

  return (
    <div>
      <div className="flex-center">
        <div className="space-evenly row ">
          <Button
            className="btn-warn"
            onClick={() => {
              logout()
              router.push("/Signin")
            }}>Logout</Button>

          <Button
            className="btn-success"
            onClick={() => {
              router.push("/Signin")
            }}>Login</Button>
        </div>
      </div>
    </div>
  )
}
