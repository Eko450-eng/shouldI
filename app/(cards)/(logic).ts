import { IFirstAnswer, IQuestion, ISecondAnswer, IUser } from '../../interfaces/interfaces'
import pb from '../(pb_functions)'

export default async function answer(user: IUser, question: string, answer: number) {
  if (!user) throw new Error("Seems like you are not logged in");
  const r: IQuestion = await pb.collection("questions").getOne(question)
  const u = await pb.collection("users").getOne(user.id)
  const currentVoted = r.voters.voted
  const currentVoters = r.voters.voters
  const votedList = [...currentVoted, user.id]

  if (currentVoted.includes(user.id)) throw new Error("Seems like you already voted");

  if (answer == 1) {
    const newAnswer = r.answerOne + 1
    const me = {
      name: u.name,
      id: u.id,
      vote: 1,
    }
    const votersList = [currentVoters, me]

    return {
      answerOne: newAnswer, voters: {
        voted: votedList,
        voters: votersList
      }
    } as IFirstAnswer

  } else if (answer == 2) {
    const newAnswer = r.answerTwo + 1
    const me = {
      name: u.name,
      id: u.id,
      vote: 2,
    }

    const votersList = [currentVoters, me]
    return {
      answerTwo: newAnswer, voters: {
        voted: votedList,
        voters: votersList
      }
    } as ISecondAnswer
  }

}
