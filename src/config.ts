// decode service account key from base64
const serviceAccountKey = JSON.parse(
  atob(process.env.FIREBASE_SERVICE_ACCOUNT_KEY || "")
);

export const config = {
  firebase: {
    serviceAccountKey,
  },
};
