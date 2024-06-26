import bodyParser from "body-parser";
import express from "express";
import { auth } from "express-oauth2-jwt-bearer";
import * as redis from "redis";
import router from "./routes";
import swaggerJSDoc from "swagger-jsdoc";
import { serve, setup } from "swagger-ui-express";
import swaggerOptions from "./swagger";
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

// app.use(jwtCheck);

const specs = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", serve, setup(specs));

app.use(bodyParser.json({ limit: "100mb" }));
app.use(router);
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
