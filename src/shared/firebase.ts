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
  const request = {
    notification: {
      ...payload.notification,
    },
    data: { ...payload.data },
    token,
  };
  console.log("Send notification request", request);

  sdk.messaging().send(request);
};

export const sendNotifications = async (
  payload: Notification,
  tokens: string[]
) => {
  const request = {
    notification: {
      ...payload.notification,
    },
    data: { ...payload.data },
    tokens,
  };

  console.log("Send notifications request", request);
  sdk.messaging().sendEachForMulticast(request);
};
