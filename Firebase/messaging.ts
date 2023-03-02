import { showNotification } from '@mantine/notifications'
import pb from 'app/(pb_functions)'
import { getToken, onMessage } from 'firebase/messaging'
import { messaging } from './firebaseConfig'

const VAPID_KEY = process.env.NEXT_PUBLIC_VAPIDKEY

export async function requestPushPermission() {
  const permission = await Notification.requestPermission()
  if (permission === "granted") {
    await saveMessagingDeviceToken()
  }
}

export async function saveMessagingDeviceToken() {
  const msg = await messaging()
  if (!msg) return
  const token = await getToken(msg, { vapidKey: VAPID_KEY })

  console.log("Got token", token)

  if (!pb.authStore.model) return
  await pb.collection("pushDevices").create({
    "device": token,
    "userID": pb.authStore.model.id
  })

  if (token) {
    if (!pb.authStore.model) return
    await pb.collection("pushDevices").create({
      "device": token,
      "userID": pb.authStore.model.id
    })
      .then(() => console.log("Success"))
    onMessage(msg, (message) => {
      if (!message.notification || !message.notification.title || !message.notification.body) return

      console.log("HERE")
      showNotification({
        title: message.notification.title,
        message: message.notification.body
      })
    })

  } else {
    requestPushPermission()
  }
  return token
}

