import { getToken, } from 'firebase/messaging'
import { messaging } from '../../../firebase/firebaseConfig.js'
import pb from '../../(pb_functions)'

export async function requestPushPermission() {
  const permission = await Notification.requestPermission()
  if (permission === "granted") {
    await saveMessagingDeviceToken()
  }
}

export async function saveMessagingDeviceToken() {
  const msg = await messaging()

  // Get the token for this device
  if (!msg) return

  const token = await getToken(msg, { vapidKey: process.env.NEXT_PUBLIC_VAPIDKEY })
  console.log(token)

  await pb.collection("pushDevices").create({
    "device": token,
    "userID": pb.authStore.model?.id
  })
    .then(() => console.log("Success"))

  if (token) {
    if (!pb.authStore.model) return
    await pb.collection("pushDevices").create({
      "device": token,
      "userID": pb.authStore.model.id
    })
      .then(() => console.log("Success"))

  } else {
    requestPushPermission()
  }
  return token
}

export async function sendPush(title: string, message: string, key: string) {
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `${process.env.NEXT_PUBLIC_AUTHORIZATIONKEY}`
  }

  const body = {
    "to": key,
    "notification": {
      "title": title,
      "body": message
    }
  }

  await fetch('https://fcm.googleapis.com/fcm/send', {
    method: "POST",
    headers: headers,
    body: JSON.stringify(body),
  })
}
