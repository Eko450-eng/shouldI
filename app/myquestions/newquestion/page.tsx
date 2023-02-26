'use client'
import '../../../styles/globals.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFile } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { IQuestionSimplified } from '../../../interfaces/interfaces'
import { useRouter } from 'next/navigation'
import { Input, Button, Stack, FileButton, ColorInput } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import pb from '../../(pb_functions)'

export default function Page() {
  const router = useRouter()
  const [question, setQuestion] = useState<IQuestionSimplified>({
    desc: "",
    image1: null,
    image2: null,
    optionNameOne: "",
    optionNameTwo: "",
    color1: "",
    color2: "",
    title: "",
  })

  const voters = ['{ "voted": [ "" ], "voters": [ [] ] } ']

  async function createNew() {
    let formData = new FormData()
    if (!pb.authStore.isValid) return
    if (!question.optionNameOne || !question.optionNameTwo) return
    formData.append("title", question.title)
    if (question.desc) formData.append("desc", question.desc ? question.desc : "")
    formData.append("optionNameOne", question.optionNameOne)
    formData.append("optionNameTwo", question.optionNameTwo)
    if (question.image1) formData.append("image1", question.image1)
    if (question.image2) formData.append("image2", question.image2)
    formData.append("answerOne", "0")
    formData.append("answerTwo", "0")
    formData.append("voters", voters[0])
    formData.append("likers", "")
    formData.append("owner", pb.authStore.model!.id)
    formData.append("comments", "")
    formData.append("color1", question.color1 ? question.color1 : "green")
    formData.append("color2", question.color2 ? question.color1 : "red")


    pb.collection("questions").create(formData)
      .then(() => {
        showNotification({
          title: "Asking has been done",
          message: "Let's wait for some answers",
          color: "green"
        })
        router.push("/")
      }).catch(() => {
        showNotification({
          title: "Oops something went wrong",
          message: "Please check all fields and try again",
          color: "red"
        })
      })
    formData = new FormData()
  }


  return (
    <div>
      <div className="flex-center">
        <p>Ask a question</p>
        <div className="flex-center desktop-row">
          <Input
            required
            onChange={(v: React.ChangeEvent<HTMLInputElement>) => setQuestion({ ...question, title: v.target.value })}
            value={question.title}
            placeholder="Title"
          />

          <Input.Wrapper
            error={(question?.desc?.length) && (question?.desc?.length > 40) ? "Too long" : ""}
          >
            <Input
              sx={{ input: { color: "white" }, label: { color: "white" } }}
              onChange={(v: React.ChangeEvent<HTMLInputElement>) => setQuestion({ ...question, desc: v.target.value })}
              value={question.desc}
              placeholder="Description" />
          </Input.Wrapper>

        </div>

        <div className="flex-center desktop-row">
          <Stack>

            <div className="row">
              <Input
                required
                sx={{ input: { color: "white" }, label: { color: "white" } }}
                className="file-upload-btn"
                onChange={(v: React.ChangeEvent<HTMLInputElement>) => setQuestion({ ...question, optionNameOne: v.target.value })}
                value={question.optionNameOne}
                placeholder="Answer one" />


              <Button
                className="file-upload-btn"
                component="label"
              >

                <FileButton onChange={(v: File) => setQuestion({ ...question, image1: v })} accept="image/png,image/jpeg">
                  {(props) => <Button {...props}><FontAwesomeIcon icon={faFile} /></Button>}
                </FileButton>
              </Button>

            </div>
            <ColorInput
              onChange={(v) => {
                setQuestion({
                  ...question,
                  color1: v
                })
              }}
              placeholder="Pick a color"
            />
          </Stack>

          <Stack>
            <div className="row">
              <Input
                sx={{ input: { color: "white" }, label: { color: "white" } }}
                onChange={(v: React.ChangeEvent<HTMLInputElement>) => setQuestion({ ...question, optionNameTwo: v.target.value })}
                value={question.optionNameTwo}
                placeholder="Answer two" />

              <Button
                className="file-upload-btn"
                component="label"
              >

                <FileButton onChange={(v: File) => {
                  setQuestion({ ...question, image2: v })
                }} accept="image/png,image/jpeg">
                  {(props) => <Button {...props}><FontAwesomeIcon icon={faFile} /></Button>}
                </FileButton>
              </Button>
            </div>
            <ColorInput
              onChange={(v) => {
                setQuestion({
                  ...question,
                  color2: v
                })
              }}
              placeholder="Pick a color"
            />
          </Stack>
        </div>

        <Button
          className="btn"
          onClick={() => createNew()}>
          Create
        </Button>
      </div>
    </div >
  )
} 
