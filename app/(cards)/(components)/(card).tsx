'use client'
import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { ActionIcon, Group } from "@mantine/core"
import pb from "app/(pb_functions)"
import { IQuestion } from "interfaces/interfaces"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Buttons from "./(buttons)"
import ImageComponent from "./(imageComponent)"
import InteractionsRow from "./(InteractionsRow)"

interface InterfaceProps {
  question: IQuestion
  visibleBackground?: boolean
}

export default function card({ props }: { props: InterfaceProps }) {
  const { question } = props
  let visibleBackground = props.visibleBackground != undefined ? props.visibleBackground : true

  const [deleteVisible, setDeleteVisible] = useState<boolean>(false)
  const router = useRouter()

  const image1 = `${process.env.NEXT_PUBLIC_DBURL}/api/files/${question.collectionId}/${question.id}/${question.image1}`
  const image2 = `${process.env.NEXT_PUBLIC_DBURL}/api/files/${question.collectionId}/${question.id}/${question.image2}`

  // Check if the user has permission to delete
  useEffect(() => {
    if (pb.authStore.isValid && (question.owner == pb.authStore.model!.id || pb.authStore.model!.role > 9)) setDeleteVisible(true)
  }, [pb.authStore.model])

  return (
    <Group sx={theme => ({ backgroundColor: visibleBackground ? theme.colors.nord_gray[4] : "none" })} className="question-card">
      <div className="question-card-head">
        <h2 className="question-card-title">{question.title}</h2>
        {
          deleteVisible &&
          <ActionIcon
            className="btn-icon"
            onClick={() => {
              pb.collection("questions").delete(question.id)
              router.refresh()
            }}
          >
            <FontAwesomeIcon color="#e03131" icon={faTrash} />
          </ActionIcon>
        }
      </div>
      <ImageComponent props={{ question, image1, image2 }} />
      <p className="question-card-desc">{question.desc ? question.desc : ""}</p>
      <Buttons question={question} />
      <InteractionsRow question={question.id} />
    </Group>
  )
}
