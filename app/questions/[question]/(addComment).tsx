'use client'
import { TextField } from "@mui/material"
import pb from "app/(pb_functions)"
import { IComment } from "interfaces/interfaces"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function AddComment({ id }: { id: string }) {
  const router = useRouter()
  const [message, setMessage] = useState<IComment>({
    message: "",
    user: "",
    thread: id
  })

  function setUser() {
    if (!pb.authStore.model || !pb.authStore.model.username) setUser()
    setMessage({ ...message, user: pb.authStore.model!.username })
  }

  // Probably a better way to do this
  useEffect(() => {
    setUser()
  }, [])

  async function handleSubmit() {
    if (!pb.authStore.isValid || !pb.authStore.model) return
    setMessage({ ...message, user: pb.authStore.model.username && pb.authStore.model.username })
    await pb.collection("comments").create(message)
    setMessage({ ...message, message: "" })
    router.refresh()
  }

  return (
    <form className="comment-input" onSubmit={(e) => e.preventDefault()}>
      <TextField
        className="white"
        sx={{ input: { color: "white" }, label: { color: "white" } }}
        value={message.message}
        onChange={(v) => setMessage({ ...message, message: v.target.value })}
        label="Message" variant="outlined" />

      <button
        className="btn"
        type="submit"
        onClick={handleSubmit}

      >Send</button>
    </form>
  )
}
