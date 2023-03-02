'use client'
import { ActionIcon, Group } from "@mantine/core"
import { IQuestion } from "interfaces/interfaces"
import Buttons from "./(votecomponents)/(buttons)"
import ImageComponent from "./(imageComponent)"
import InteractionsRow from "./(InteractionsRow)"
import pb from "app/(pb_functions)"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react"

interface InterfaceProps {
  id: string
  visibleBackground?: boolean
  buttons?: boolean
}

export default function card({ props }: { props: InterfaceProps }) {
  let visibleBackground = props.visibleBackground != undefined ? props.visibleBackground : true
  let buttons = props.buttons != undefined ? props.buttons : true
  const [question, setQuestion] = useState<IQuestion>()
  const [image1, setImage1] = useState("")
  const [image2, setImage2] = useState("")

  const { id } = props

  async function getQuestion() {
    const data = await pb.collection("questions").getOne(id) as IQuestion
    setQuestion(data)
  }

  useEffect(() => {
    getQuestion()

    if (!question) return
    setImage1(`${process.env.NEXT_PUBLIC_DBURL}/api/files/${question.collectionId}/${question.id}/${question.image1}`)
    setImage2(`${process.env.NEXT_PUBLIC_DBURL}/api/files/${question.collectionId}/${question.id}/${question.image2}`)


  }, [props])

  useEffect(() => {
    pb.collection("questions").subscribe(id, (e: any) => {
      getQuestion()
    })
  }, [id])

  return (
    <Group sx={theme => ({ backgroundColor: visibleBackground ? theme.colors.nord_gray[4] : "none" })} className="question-card">
      {question &&
        <>
          <div className="question-card-head">
            <h2 className="question-card-title">
              {question ? question.title : ""}
            </h2>
            {
              (pb.authStore.isValid && (question.owner == pb.authStore.model!.id || pb.authStore.model!.role > 9)) &&
              <ActionIcon onClick={() => pb.collection("questions").delete(question.id)} >
                <FontAwesomeIcon color="#e03131" icon={faTrash} />
              </ActionIcon>
            }
          </div>

          <ImageComponent props={{ question, image1, image2 }} />
          <p className="question-card-desc">{question.desc ? question.desc : ""}</p>
          <Buttons card={question} />
          {buttons &&
            <InteractionsRow question={question} />
          }
        </>
      }
    </Group>
  )
}
