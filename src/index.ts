import express, { Request, Response } from "express";
import { db } from "./database";
import { auth } from "express-oauth2-jwt-bearer";
import router from "./routes";

const app = express();
const port = process.env.PORT || 8080;

const jwtCheck = auth({
  audience: "https://mytrackr-api/",
  issuerBaseURL: "https://dev-3e4c7c585pp5uhrt.us.auth0.com/",
  tokenSigningAlg: "RS256",
});

// enforce on all endpoints
// app.use(jwtCheck);

app.get("/", async (req: Request, res: Response) => {
  const test = await db.selectFrom("account").selectAll().execute();
  res.send(test);
});

app.use(router);
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
