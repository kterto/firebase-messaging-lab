var admin = require("firebase-admin");
var getMessaging = require("firebase-admin/messaging").getMessaging;
var serviceAccount = require(`${process.env.SERVICE_ACCOUNT}`);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// device token
// This registration token comes from the client FCM SDKs.
// You can get it from the client app when the user registers for notifications.
const registrationToken = `${process.env.REGISTRATION_TOKEN}`;

const message = {
  token: registrationToken,
  notification: {
    title: "Test Notification",
    body: "This is a test with an image",
  },
  android: {
    notification: {
      imageUrl: "https://cdn.vuetifyjs.com/images/cards/foster.jpg",
    },
  },
  apns: {
    payload: {
      aps: {
        mutableContent: true, // This allows the notification to be modified by app extensions
      },
    },
  },
  data: {
    imageUrl: "https://cdn.vuetifyjs.com/images/cards/foster.jpg",
  },
};

// Send a message to the device corresponding to the provided
// registration token.
getMessaging()
  .send(message)
  .then((response) => {
    // Response is a message ID string.
    console.log("Successfully sent message:", response);
  })
  .catch((error) => {
    console.log("Error sending message:", error);
  });
