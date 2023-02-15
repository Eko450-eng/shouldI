'use client'
import '../../../styles/globals.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFile } from '@fortawesome/free-solid-svg-icons'
import { TextField } from '@mui/material'
import { useState } from 'react'
import { IQuestionSimplified } from '../../../interfaces/interfaces'
import createNew from './(logic)'
import { useRouter } from 'next/navigation'
import { Button } from '@mui/material'

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

          <TextField
            sx={{ input: { color: "white" }, label: { color: "white" } }}
            onChange={(v: React.ChangeEvent<HTMLInputElement>) => setQuestion({ ...question, title: v.target.value })}
            value={question.title}
            label="Title" />

          <TextField
            sx={{ input: { color: "white" }, label: { color: "white" } }}
            onChange={(v: React.ChangeEvent<HTMLInputElement>) => setQuestion({ ...question, desc: v.target.value })}
            value={question.desc}
            label="Description" />

        </div>

        <div className="flex-center desktop-row">
          <div className="row">
            <TextField
              sx={{ input: { color: "white" }, label: { color: "white" } }}
              className="file-upload-btn"
              onChange={(v: React.ChangeEvent<HTMLInputElement>) => setQuestion({ ...question, optionNameOne: v.target.value })}
              value={question.optionNameOne}
              variant="standard"
              label="Answer one" />

            <Button
              className="file-upload-btn"
              variant="text"
              component="label"
            >

              <FontAwesomeIcon icon={faFile} />
              {/* To-Do change any to correct typ */}
              <input type="file" hidden name="file" onChange={(v: any) => setQuestion({ ...question, image1: v.target.files[0] })} />
            </Button>
          </div>

          <div className="row">

            <TextField
              sx={{ input: { color: "white" }, label: { color: "white" } }}
              variant="standard"
              onChange={(v: React.ChangeEvent<HTMLInputElement>) => setQuestion({ ...question, optionNameTwo: v.target.value })}
              value={question.optionNameTwo}
              label="Answer two" />

            <Button
              variant="text"
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
