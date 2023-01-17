import pb from "../../(pb_functions)"
import { IQuestionSimplified } from "../../../interfaces/interfaces"

const formData = new FormData()
const arr = ['{ "voted": [ "" ], "voters": [ [] ] } ']

export default async function createNew(question: IQuestionSimplified) {
  try {
    if (!pb.authStore.isValid)
      if (!question.optionNameOne || !question.optionNameTwo) return
    formData.append("owner", pb.authStore.model!.id)
    formData.append("title", question.title)
    if (question.desc) formData.append("desc", question.desc ? question.desc : "")
    formData.append("optionNameOne", question.optionNameOne)
    formData.append("optionNameTwo", question.optionNameTwo)
    if (question.image1) formData.append("image1", question.image1)
    if (question.image2) formData.append("image2", question.image2)
    formData.append("answerOne", "0")
    formData.append("answerTwo", "0")
    formData.append("voters", arr[0])

    await pb.collection("questions").create(formData)
    return true
  } catch (e) {
    return false
  }
}
