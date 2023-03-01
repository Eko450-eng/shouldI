import { getToken } from 'firebase/messaging'
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
  if (!msg) return
  const token = await getToken(msg, { vapidKey: "BFE6apUW84FptyaCmVS54gk8JPqCaqKejCRbyc3Ss_oMFhPPlU-ANzhjPdS00t5AT29L1E8I_csp6l-8olB7_Ig" })
  if (token) {
    if (!pb.authStore.model) return
    await pb.collection("users").update(pb.authStore.model.id, {
      "pushNotificationTokenID": token
    })
      .then(() => console.log("Success"))

  } else {
    requestPushPermission()
  }
}
