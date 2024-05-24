import sdk from "firebase-admin";
import { config } from "../config";
export const app = sdk.initializeApp({
  credential: sdk.credential.cert(config.firebase.serviceAccountKey),
});

export type Notification = {
  notification: {
    title: string;
    body: string;
  };
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  data?: any;
};

export const sendNotification = async (
  payload: Notification,
  token: string
) => {
  sdk.messaging().send({
    ...payload,
    token,
  });
};

export const sendNotifications = async (
  payload: Notification,
  tokens: string[]
) => {
  sdk.messaging().sendEachForMulticast({
    ...payload,
    tokens,
  });
};
