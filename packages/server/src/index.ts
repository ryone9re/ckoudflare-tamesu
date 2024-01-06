import { Hono } from "hono";

type Bindings = {
  QUEUE: Queue;
};

const app = new Hono<{ Bindings: Bindings }>();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});
app.post("/post", async (c) => {
  const body = await c.req.parseBody();
  let message: string;
  if (typeof body["key"] === "string") {
    message = body["key"];
  } else {
    message = "keyです";
  }
  await c.env.QUEUE.send({
    value: message,
  });
  return c.json({ message: "success" });
});

export default app;
