'use client'
import '../../../styles/globals.scss'
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
        <TextField
          className="white"
          sx={{ input: { color: "white" }, label: { color: "white" } }}
          onChange={(v: React.ChangeEvent<HTMLInputElement>) => setQuestion({ ...question, title: v.target.value })}
          value={question.title}
          label="Title" />

        <TextField
          sx={{ input: { color: "white" }, label: { color: "white" } }}
          className="white"
          onChange={(v: React.ChangeEvent<HTMLInputElement>) => setQuestion({ ...question, desc: v.target.value })}
          value={question.desc}
          label="Description" />


        <div className="flex-center row">
          <TextField
            sx={{ input: { color: "white" }, label: { color: "white" } }}
            className="white"
            onChange={(v: React.ChangeEvent<HTMLInputElement>) => setQuestion({ ...question, optionNameOne: v.target.value })}
            value={question.optionNameOne}
            label="Answer one" />

          <TextField
            sx={{ input: { color: "white" }, label: { color: "white" } }}
            className="white"
            onChange={(v: React.ChangeEvent<HTMLInputElement>) => setQuestion({ ...question, optionNameTwo: v.target.value })}
            value={question.optionNameTwo}
            label="Answer two" />
        </div>

        <div className="flex-center row">
          <Button
            className="btn"
            variant="contained"
            component="label"
          >
            Upload first image
            {/* To-Do change any to correct typ */}
            <input type="file" hidden name="file" onChange={(v: any) => setQuestion({ ...question, image1: v.target.files[0] })} />
          </Button>

          <Button
            className="btn"
            variant="contained"
            component="label"
          >
            Upload second image
            <input type="file" hidden name="file" onChange={(v: any) => setQuestion({ ...question, image2: v.target.files[0] })} />
          </Button>
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
