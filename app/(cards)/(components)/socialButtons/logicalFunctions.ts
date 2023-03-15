import pb from "app/(pb_functions)"

export function deleteQuestion(id: string) {
  try {
    pb.collection("questions").delete(id)
  } catch (e) {
    console.log(e)
  }
}

