import bodyParser from "body-parser";
import express from "express";
import { auth } from "express-oauth2-jwt-bearer";
import * as redis from "redis";
import swaggerJSDoc from "swagger-jsdoc";
import { serve, setup } from "swagger-ui-express";
import swaggerOptions from "./swagger";
import router from "./routes/routes";
import { authTestToken } from "./utils/testUtils";
const app = express();
const port = process.env.PORT || 8080;

export const redisClient = redis.createClient({
  url: process.env.REDIS_CLIENT,
});

redisClient.connect();
redisClient.on("error", (err) => console.log("Redis Client Error", err));

const specs = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", serve, setup(specs));

if (process.env.NODE_ENV === "test") {
  app.use(authTestToken);
} else {
  const jwtCheck = auth({
    audience: process.env.MYTRCKR_API,
    issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
    tokenSigningAlg: "RS256",
  });
  app.use(jwtCheck);
}

app.use(bodyParser.json({ limit: "100mb" }));
app.use(router);
const server = app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

export const closeServer = async () => {
  await server.close();
  await redisClient.quit();
};

export default app;
