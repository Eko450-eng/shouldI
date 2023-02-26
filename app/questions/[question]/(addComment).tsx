'use client'
import pb from "app/(pb_functions)"
import { Input, Button, Group } from '@mantine/core'
import { IComment, IQuestion } from "interfaces/interfaces"
import { useState } from "react"

export default function AddComment({ props }: { props: { refetch: any, question: IQuestion } }) {
  const { refetch, question } = props
  const initialData = {
    message: "",
    user: "",
    thread: question.id,
    userID: ""
  }

  const [message, setMessage] = useState<IComment>(initialData)

  async function handleSubmit() {
    console.log(message)
    if (!pb.authStore.isValid || !pb.authStore.model) return

    await pb.collection("comments").create({
      "user": pb.authStore.model.username,
      "userID": pb.authStore.model.id,
      "message": message.message,
      "thread": question.id
    })
    setMessage(initialData)
  }

  return (
    <>
      {pb.authStore.isValid &&
        <Group sx={{
          position: "fixed",
          bottom: "7rem",

        }}>
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
        </Group>
      }
    </>
  )
}
