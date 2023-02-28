// urlB64ToUint8Array is a magic function that will encode the base64 public key
// to Array buffer which is needed by the subscription option
const urlB64ToUint8Array = base64String => {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/')
  const rawData = atob(base64)
  const outputArray = new Uint8Array(rawData.length)
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}
// saveSubscription saves the subscription to the backend
const saveSubscription = async subscription => {
  console.log(JSON.stringify(subscription))
  return response.json()
}
self.addEventListener('activate', async () => {
  try {
    const applicationServerKey = urlB64ToUint8Array(
      'BLo1RSUB_siVS-KU6gDsVN72MibaUn8rPfPVay0tHJws6JbV_ljMAR3CEcjZqPH1uKF4MKpOYIsjYkmkPM8ypGY'
    )
    const options = { applicationServerKey, userVisibleOnly: true }
    const subscription = await self.registration.pushManager.subscribe(options)
    const response = await saveSubscription(subscription)
    console.log(response)
  } catch (err) {
    console.log('Error', err)
  }
})
