const push = require("web-push")

const key = {
  publicKey: 'BLo1RSUB_siVS-KU6gDsVN72MibaUn8rPfPVay0tHJws6JbV_ljMAR3CEcjZqPH1uKF4MKpOYIsjYkmkPM8ypGY',
  privateKey: 'RmobxbmU9eF__kGjCkVFWfAe1V1oh7lh1UkKhAGzpw8'
}

push.setVapidDetails('mailto:ekrem@wipdesign.de', key.publicKey, key.privateKey)

const sub = {}
push.sendNotification(sub, "test")
