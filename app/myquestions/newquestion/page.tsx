'use client'
import '../../../styles/globals.scss'
import { TextField } from '@mui/material'
import { useState } from 'react'
import { IQuestionSimplified } from '../../../interfaces/interfaces'
import createNew from './(logic)'
import { useRouter } from 'next/navigation'
import { Button } from '@mui/material'
import { createTheme } from '@mui/material'

const style = createTheme({
  components: {
    MuiInputBase: {
      styleOverrides: {
        input: {
          color: 'white',
        }
      }
    }
  }
})

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
          sx={{ label: { color: "white" } }}
          onChange={(v) => setQuestion({ ...question, title: v.target.value })}
          value={question.title}
          label="Title" variant="outlined" />

        <TextField
          sx={{ label: { color: "white" } }}
          className="white"
          onChange={(v) => setQuestion({ ...question, desc: v.target.value })}
          value={question.desc}
          label="Description" variant="outlined" />


        <div className="flex-center row">
          <TextField
            sx={{ label: { color: "white" } }}
            className="white"
            onChange={(v) => setQuestion({ ...question, optionNameOne: v.target.value })}
            value={question.optionNameOne}
            label="Answer one" variant="outlined" />

          <TextField
            sx={{ label: { color: "white" } }}
            className="white"
            onChange={(v) => setQuestion({ ...question, optionNameTwo: v.target.value })}
            value={question.optionNameTwo}
            label="Answer two" variant="outlined" />
        </div>

        <div className="flex-center row">
          <Button
            className="btn"
            variant="contained"
            component="label"
          >
            Upload first image
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
          onClick={() => createNew(question).then(
            (e) => {
              if (e) router.back()
              else {
                return
              }
            }
          )}>
          Create
        </button>
      </div>
    </div>
  )
} 
