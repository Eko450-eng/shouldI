'use client'
import pb from 'app/(pb_functions)'
import Image from 'next/image'
import { IComment, IQuestion } from 'interfaces/interfaces'
import { Record } from 'pocketbase'
import { useEffect, useState } from 'react'
import Card from '../../(cards)/(components)/(card)'
import AddComment from './(addComment)'
import { Group, Stack, Text } from '@mantine/core'

export default function Page({ params }: { params: { question: string } }) {
  const [question, setQuestion] = useState<IQuestion | null>(null)
  const [comments, setComments] = useState<IComment[] | null>(null)
  const placeholder = `${process.env.NEXT_PUBLIC_DBURL}/api/files/assets/ocmfvobwbq7xu1u/frame_2_qAqNR4gVxy.png`
  const [avatar, setAvatar] = useState<string>(placeholder)

  async function refetch() {
    await pb.collection("questions").getOne(params.question, { $autoCancel: false, sort: "-created" })
      .then((e: unknown) => {
        const record = e as IQuestion
        setQuestion(record)
      })
  }

  async function getQuestions() {
    await pb.collection("comments").getList(1, 50, { $autoCancel: false, filter: `thread="${params.question}"` })
      .then((e: unknown) => {
        const data = e as Record
        const commentList = data.items as IComment[]
        setComments(commentList)
      })
  }

  useEffect(() => {
    refetch()
    getQuestions()
  }, [])

  return (
    <div className="flex-center">
      {question && <Card props={{ question, visibleBackground: false }} />}

      <div className="commentbox-wrapper">
        {
          comments &&
          comments.map((comment: IComment, index: number) => {

            const userImage = pb.collection("users").getOne(comment.userID, { $autoCancel: false }).then((e: any) => {
              setAvatar(`${process.env.NEXT_PUBLIC_DBURL}/api/files/users/${comment.userID}/${e.image}`)
            })

            userImage
            return (
              <Group className="commentbox" key={index}>
                <Image
                  alt={`Avatar Image of the user`}
                  className="profile-icon"
                  src={avatar}
                  width="40"
                  height="40"
                />
                <Stack spacing="xs">
                  <Text variant="gradient" size="sm">{comment.user}</Text>
                  <Text>{comment.message}</Text>
                </Stack>
              </Group>
            )
          })
        }
      </div>
      {question && <AddComment id={question.collectionId} />}
    </div>
  )
}
