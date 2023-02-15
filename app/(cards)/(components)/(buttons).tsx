'use client'
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import answer from "../(logic)"
import pb from "../../(pb_functions)"
import { IQuestion, IVoter } from "interfaces/interfaces"
import { assign, createMachine, interpret, StateMachine } from "xstate";
import { useMachine } from "@xstate/react";
import { stat } from "fs"
import voteButtonPromise from "app/(states)/UserAuthState"

interface IBtn {
  name: string
  votes: number
  vote: 1 | 2
}

interface VoteStates {
  id: number;
  done: boolean;
  text: string;
}

const userAuthStateInter = interpret(voteButtonPromise)
  .start()

export default function Buttons({ question }: { question: IQuestion }) {
  const [state, send] = useMachine(voteButtonPromise);
  const [voteValue, setVoteValue] = useState<Number>(0);
  const router = useRouter()


  async function checkIfAuthenticated() {
    if (!pb.authStore.isValid || !pb.authStore.model?.id) return
    userAuthStateInter.send("AUTHENTICATED")
    checkIfVoted()
  }

  function checkIfVoted() {
    question.voters.voters.filter((k, v) => {
      if (k.name == pb.authStore.model!.name) {
        userAuthStateInter.send("DIDVOTE")
        userAuthStateInter.send(`VOTE${k.vote}`)
        setVoteValue(k.vote)
      }
    });
  };

  useEffect(() => {
    checkIfAuthenticated()
  })

  function Btn({ props }: { props: IBtn }) {
    const { name, votes, vote } = props
    const displayText: String = `${name} ${voteValue > 0 ? votes : ""}`

    const highlight: boolean = vote == voteValue 

    return (
      <button
        className={
           highlight ? "btn answer-selection-selected" : "btn answer-selection-text"
        }
        onClick={() => {
          if (!pb.authStore.model || state.value != "CANVOTE") return
          answer(pb.authStore.model, question.id, vote).then(
            (res: any) => pb.collection("questions").update(question.id, res).then((res) => router.refresh())
          )
        }}>
        {displayText}
      </button>
    )
  }


  return (
    <div className={`answer-selection`}>
      <Btn props={{ name: question.optionNameOne, votes: question.answerOne, vote: 1 }} />
      <Btn props={{ name: question.optionNameTwo, votes: question.answerTwo, vote: 2 }} />
    </div>
  )
}
