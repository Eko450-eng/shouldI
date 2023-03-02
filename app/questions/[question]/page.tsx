'use client'
import pb from 'app/(pb_functions)'
import { IComment, IQuestion } from 'interfaces/interfaces'
import { useEffect, useState } from 'react'
import Card from '../../(cards)/(components)/(card)'
import AddComment from './(addComment)'
import { Button } from '@mantine/core'
import Commentbox from './(commentbox)'
import { Record } from 'pocketbase'

export default function Page({ params }: { params: { question: string } }) {
  const [question, setQuestion] = useState<IQuestion | null>(null)
  const [id, setId] = useState<string>("")
  const [comments, setComments] = useState<IComment[] | null>(null)
  const [visibleAmount, setVisibleAmount] = useState<number>(5)

  async function refetch() {
    await pb.collection("questions").getOne(params.question, { $autoCancel: false, sort: "-created" })
      .then((e: unknown) => {
        const record = e as IQuestion
        setId(record.id)
        setQuestion(record)
      })

    await pb.collection("comments")
      .getList(1, visibleAmount, { $autoCancel: false, sort: "-created", filter: `thread="${params.question}"` })
      .then((e: unknown) => {
        const record = e as Record
        const items = record.items as IComment[]

        setComments(items)
      })
  }

  useEffect(() => {
    refetch()
  }, [visibleAmount])


  return (
    <div className="flex-center">
      {id && <Card props={{ id, visibleBackground: false, buttons: false }} />}

      <div style={{ marginBottom: "14rem" }} className="commentbox-wrapper">
        {comments &&
          comments.map((comment: IComment, index: number) => {
            return <Commentbox key={index} props={{ userID: comment.userID, username: comment.user, message: comment.message }} />
          })}
        <Button onClick={() => setVisibleAmount(visibleAmount + 5)}>Show more</Button>
      </div>

      {question && <AddComment props={{ question: question, refetch: refetch }} />}
    </div>
  )
}
