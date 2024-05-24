import { Hono } from "hono";
import {
  type Notification,
  sendNotification,
  sendNotifications,
} from "./shared/firebase";
import { v4 as uuidv4 } from "uuid";

const app = new Hono();
const fcmTokens: Map<string, string> = new Map();

type UserNotification = Notification & { uuid: string };

app.get("/", (c) => {
  return c.json({ message: "Hello Notification Service!" });
});

app.post("/register", async (c) => {
  const { token } = await c.req.json();

  const uuid = uuidv4();
  fcmTokens.set(uuid, token);

  return c.json({ status: "Registered", uuid });
});

app.post("/send-notification", async (c) => {
  const request = await c.req.json<UserNotification>();
  const token = fcmTokens.get(request.uuid);

  if (!token) {
    return c.json({ status: "User not found" }, 400);
  }

  await sendNotification(request, token);

  return c.json({ status: "Notification sent" });
});

app.post("/send-notifications", async (c) => {
  const request = await c.req.json<Notification>();
  await sendNotifications(request, Array.from(fcmTokens.values()));

  return c.json({ status: "Notifications sent" });
});

export default app;
