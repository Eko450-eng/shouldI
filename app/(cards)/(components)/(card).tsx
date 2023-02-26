'use client'
import { Group } from "@mantine/core"
import { IQuestion } from "interfaces/interfaces"
import Buttons from "./(votecomponents)/(buttons)"
import ImageComponent from "./(imageComponent)"
import InteractionsRow from "./(InteractionsRow)"
import DeleteButton from "./socialButtons/(deleteButton)"

interface InterfaceProps {
  question: IQuestion
  visibleBackground?: boolean
  buttons?: boolean
}

export default function card({ props }: { props: InterfaceProps }) {
  let visibleBackground = props.visibleBackground != undefined ? props.visibleBackground : true
  let buttons = props.buttons != undefined ? props.buttons : true
  const { question } = props

  const image1 = `${process.env.NEXT_PUBLIC_DBURL}/api/files/${question.collectionId}/${question.id}/${question.image1}`
  const image2 = `${process.env.NEXT_PUBLIC_DBURL}/api/files/${question.collectionId}/${question.id}/${question.image2}`

  return (
    <Group sx={theme => ({ backgroundColor: visibleBackground ? theme.colors.nord_gray[4] : "none" })} className="question-card">
      <div className="question-card-head">
        <h2 className="question-card-title">
          {question.title}
        </h2>
        <DeleteButton question={question} />
      </div>

      <ImageComponent props={{ question, image1, image2 }} />
      <p className="question-card-desc">{question.desc ? question.desc : ""}</p>
      <Buttons card={question} />
      {buttons &&
        <InteractionsRow question={question} />
      }
    </Group>
  )
}
