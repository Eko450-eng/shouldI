'use client'
import '../../../styles/globals.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFile } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import { IQuestionSimplified } from '../../../interfaces/interfaces'
import createNew from './(logic)'
import { useRouter } from 'next/navigation'
import { Input, Button } from '@mantine/core'

export default function Page() {
  const router = useRouter()
  const [question, setQuestion] = useState<IQuestionSimplified>({
    desc: "",
    image1: null,
    image2: null,
    optionNameOne: "",
    optionNameTwo: "",
    title: "",
  })


  return (
    <div>
      <div className="flex-center">
        <p>Ask a question</p>
        <div className="flex-center desktop-row">

          <Input
            onChange={(v: React.ChangeEvent<HTMLInputElement>) => setQuestion({ ...question, title: v.target.value })}
            value={question.title}
            placeholder="Title" />

          <Input
            sx={{ input: { color: "white" }, label: { color: "white" } }}
            onChange={(v: React.ChangeEvent<HTMLInputElement>) => setQuestion({ ...question, desc: v.target.value })}
            value={question.desc}
            placeholder="Description" />

        </div>

        <div className="flex-center desktop-row">
          <div className="row">
            <Input
              sx={{ input: { color: "white" }, label: { color: "white" } }}
              className="file-upload-btn"
              onChange={(v: React.ChangeEvent<HTMLInputElement>) => setQuestion({ ...question, optionNameOne: v.target.value })}
              value={question.optionNameOne}
              placeholder="Answer one" />

            <Button
              className="file-upload-btn"
              component="label"
            >

              <FontAwesomeIcon icon={faFile} />
              {/* To-Do change any to correct typ */}
              <input type="file" hidden name="file" onChange={(v: any) => setQuestion({ ...question, image1: v.target.files[0] })} />
            </Button>
          </div>

          <div className="row">

            <Input
              sx={{ input: { color: "white" }, label: { color: "white" } }}
              onChange={(v: React.ChangeEvent<HTMLInputElement>) => setQuestion({ ...question, optionNameTwo: v.target.value })}
              value={question.optionNameTwo}
              placeholder="Answer two" />

            <Button
              component="label"
            >
              <FontAwesomeIcon icon={faFile} />
              <input type="file" hidden name="file" onChange={(v: any) => setQuestion({ ...question, image2: v.target.files[0] })} />
            </Button>
          </div>
        </div>

        <button
          className="btn"
          onClick={() => {
            createNew(question)
            router.push("/")
          }}>
          Create
        </button>
      </div>
    </div>
  )
} 
