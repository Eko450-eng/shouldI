'use client'
import pb from "app/(pb_functions)"
import { Input, Button } from '@mantine/core'
import { IComment } from "interfaces/interfaces"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function AddComment({ id }: { id: string }) {
  const router = useRouter()
  const [message, setMessage] = useState<IComment>({
    message: "",
    user: "",
    thread: id,
    userID: ""
  })

  function setUser() {
    if (!pb.authStore.model || !pb.authStore.model.username) return
    setMessage({ ...message, user: pb.authStore.model!.username })
  }

  // Probably a better way to do this
  useEffect(() => {
    setUser()
  }, [])

  async function handleSubmit() {
    if (!pb.authStore.isValid || !pb.authStore.model) return
    setMessage({
      ...message,
      user: pb.authStore.model.username && pb.authStore.model.username,
      userID: pb.authStore.model.id
    })
    await pb.collection("comments").create(message)
    setMessage({ ...message, message: "" })
    router.push(`/questions/${id}`)
  }

  return (
    <>
      {pb.authStore.isValid &&
        <form className="flex-center row" onSubmit={(e) => e.preventDefault()}>
          <Input
            className="white"
            sx={{ input: { color: "white" }, label: { color: "white" } }}
            value={message.message}
            onChange={(v) => setMessage({ ...message, message: v.target.value })}
            placeholder="Message"
          />

          <Button
            type="submit"
            onClick={handleSubmit}

          >Send</Button>
        </form>
      }
    </>
  )
}
