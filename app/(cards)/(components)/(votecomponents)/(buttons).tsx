'use client'
import { useEffect, useState } from "react"
import pb from "../../../(pb_functions)"
import { IQuestion } from "interfaces/interfaces"
import VoteButton from "./(VoteButton)"

export default function Buttons({ card }: { card: IQuestion }) {
  const [currentState, setCurrentState] = useState<string>("pending");
  const [voteValue, setVoteValue] = useState<number>(0);

  async function checkIfAuthenticated() {
    if (!pb.authStore.isValid || !pb.authStore.model?.id) return
    setCurrentState("canVote")
    checkIfVoted()
  }

  function checkIfVoted() {
    card.voters.voters.filter((k: { id: string, name: string, vote: number }) => {
      if (k.name == pb.authStore.model!.name) {
        setCurrentState("DIDVOTE")
        setCurrentState(`VOTE${k.vote}`)
        setVoteValue(k.vote)
      }
    });
  };

  useEffect(() => {
    checkIfAuthenticated()
  })

  return (
    <div className={`flex-center row`}>
      <VoteButton props={{ card: card, currentState: currentState, voteValue: voteValue, name: card.optionNameOne, votes: card.answerOne, vote: 1 }} />
      <VoteButton props={{ card: card, currentState: currentState, voteValue: voteValue, name: card.optionNameTwo, votes: card.answerTwo, vote: 2 }} />
    </div>
  )
}
