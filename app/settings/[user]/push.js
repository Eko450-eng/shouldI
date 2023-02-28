const push = require("web-push")

const key = {
  publicKey: 'BLo1RSUB_siVS-KU6gDsVN72MibaUn8rPfPVay0tHJws6JbV_ljMAR3CEcjZqPH1uKF4MKpOYIsjYkmkPM8ypGY',
  privateKey: 'RmobxbmU9eF__kGjCkVFWfAe1V1oh7lh1UkKhAGzpw8'
}

push.setVapidDetails('mailto:ekrem@wipdesign.de', key.publicKey, key.privateKey)

const sub = {
  endpoint: "https://fcm.googleapis.com/fcm/send/eMXUuYY9PgE:APA91bEZrMNocx4gx9SDUDyA5qbbtLYnzlcJulNRGdAs-1bll3qwx9JnebM2eJcXBOPcMxiRYFoo8vpm0oDVItWJDoC6pqpRgMr_cHQHdKps9nG2Vkcos-yGhNaLETeueYFM6bqQ8_s1",
  expirationTime: null,
  keys: {
    auth: "7WtKClgtjXY4Z5PxlSRgeQ",
    p256dh: "BISsHWKuKFf2Ux22Uu_plFWLyxwk5bs1GgamQC5dW6h40GNq2XP9jDRPEy4u3KKTXvgve2PQjRX8ANPLOmk7ktw"
  }
}

push.sendNotification(sub, "test")

