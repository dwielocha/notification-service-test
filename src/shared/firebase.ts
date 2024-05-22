import sdk from "firebase-admin";
import { config } from "../config";

export const app = sdk.initializeApp({
  credential: sdk.credential.cert(config.firebase.serviceAccountKey),
});

export const sendNotification = async (
  title: string,
  message: string,
  token: string
) => {
  sdk.messaging().send({
    token,
    notification: {
      title,
      body: message,
    },
  });
};

export const sendNotifications = async (
  title: string,
  message: string,
  tokens: string[]
) => {
  sdk.messaging().sendEachForMulticast({
    tokens,
    notification: {
      title,
      body: message,
    },
  });
};
