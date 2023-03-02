import { app } from '../../../Firebase/firebaseConfig'
import { getMessaging, getToken } from 'firebase/messaging'
import pb from '../../(pb_functions)'

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

export async function reSendToken() {
  const msg = getMessaging(app)
  if (!msg) return
  const token = await getToken(msg, { vapidKey: process.env.NEXT_PUBLIC_VAPIDKEY })
  console.log(token)
  await pb.collection('pushKeys').create({
    token: token
  })
}

export async function sendNewVote(vote: string, message: string, key: string) {

  const headers = {
    "Content-Type": "application/json",
    "Authorization": `${process.env.NEXT_PUBLIC_AUTHORIZATIONKEY}`
  }

  const body = {
    "to": key,
    "notification": {
      "title": `There has been a new vote on ${vote}`,
      "body": message,
      "icon": "/Logo.png"
    }
  }

  await fetch('https://fcm.googleapis.com/fcm/send', {
    method: "POST",
    headers: headers,
    body: JSON.stringify(body),
  })

}
