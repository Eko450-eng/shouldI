import pb from "app/(pb_functions)"
import { getMessaging } from "firebase/messaging"
import { messaging } from "./firebaseConfig"

export async function sendTestMessage(user: string) {
  const message = "Wohoo everything fine"
  const userRecord = await pb.collection("users").getOne(user)
  const token = userRecord.pushNotificationTokenID
  console.log(token)

  const payload = {
    token,
    notification: {
      title: "Fine",
      body: message
    }
  }
}
