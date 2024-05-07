import express, { Request, Response } from "express";
import { auth, JWTPayload } from "express-oauth2-jwt-bearer";
import router from "./routes";
import * as redis from "redis";
const app = express();
const port = process.env.PORT || 8080;

export const redisClient = redis.createClient({
  url: process.env.REDIS_CLIENT,
});

redisClient.connect();
redisClient.on("error", (err) => console.log("Redis Client Error", err));

export const jwtCheck = auth({
  audience: process.env.MYTRCKR_API,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  tokenSigningAlg: "RS256",
});

app.use(jwtCheck);

app.get("/", async (req: Request, res: Response) => {
  const auth = req.auth;
  const payload = auth?.payload as JWTPayload;
  console.log(`Hello ${payload.sub}`);
  res.send(`Hello ${payload.sub}`);
  // const test = await db.selectFrom("account").selectAll().execute();
  // res.send(test);
});

app.use(router);
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
