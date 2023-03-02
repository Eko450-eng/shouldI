import { showNotification } from "@mantine/notifications";
import { getMessaging, onMessage } from "firebase/messaging";

const messaging = getMessaging();
onMessage(messaging, (payload) => {
  console.log('Message received. ', payload);
  showNotification({
    title: payload.notification.title,
    message: payload.notification.body
  })
});
