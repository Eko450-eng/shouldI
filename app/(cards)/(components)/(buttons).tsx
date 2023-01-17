'use client'
import { useEffect, useState } from "react"
import pb from "../../(pb_functions)"
import answer from "../(logic)"

export default function Buttons({ i }: { i: any }) {
  const [voted, setVoted] = useState<0 | 1 | 2>(0)

  // Find what the user has voted for
  const votedFor = i.voters.voters.find((e: any) => {
    if (!e || !pb.authStore.model) return
    return e.id == pb.authStore.model.id
  })

  useEffect(() => {
    if (votedFor && pb.authStore.isValid) {
      switch (votedFor.vote) {
        case 1:
          setVoted(1)
          return
        case 2:
          setVoted(2)
          return
      }
    }
  }, [])


  return (
    <div className="answer-selection">
      <>
        <button
          className={`${voted == 1 ? "btn answer-selection-selected" : "btn answer-selection-text"}`}
          onClick={() => {
            if (!pb.authStore.model) return
            answer(pb.authStore.model, i.id, 1)
          }}>
          {i.optionNameOne}: {i.answerOne}
        </button>
        <button
          className={`${voted == 2 ? "btn answer-selection-selected" : "btn answer-selection-text"}`}
          onClick={() => {
            if (!pb.authStore.model) return
            answer(pb.authStore.model, i.id, 2)
          }}>
          {i.optionNameTwo}: {i.answerTwo}
        </button>
      </>
    </div>
  )
}
