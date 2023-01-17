import { Admin, Record } from "pocketbase"
import { IQuestion } from '../../interfaces/interfaces'
import pb from '../(pb_functions)'

export default async function answer(user: Record | Admin, question: string, answer: number) {
  if (!user) return
  const r: IQuestion = await pb.collection("questions").getOne(question)
  const u = await pb.collection("users").getOne(user.id)
  const currentVoted = r.voters.voted
  const currentVoters = r.voters.voters
  const votedList = [...currentVoted, user.id]

  if (currentVoted.includes(user.id)) return

  if (answer == 1) {
    const newAnswer = r.answerOne + 1
    const me = {
      name: u.name,
      id: u.id,
      vote: 1,
    }
    const votersList = [currentVoters, me]

    pb.collection("questions").update(question, {
      answerOne: newAnswer, voters: {
        voted: votedList,
        voters: votersList
      }
    })

  } else if (answer == 2) {
    const newAnswer = r.answerTwo + 1
    const me = {
      name: u.name,
      id: u.id,
      vote: 2,
    }

    const votersList = [currentVoters, me]
    pb.collection("questions").update(question, {
      answerTwo: newAnswer, voters: {
        voted: votedList,
        voters: votersList
      }
    })
  }

}
