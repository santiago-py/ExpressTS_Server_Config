import express, { Express } from "express";
import dotenv from "dotenv";
import portfolioRouter from "./routes/portfolio";

dotenv.config();

const port: number | string = process.env.PORT || 8080;
const app: Express = express();

app.get("/", (_, res) => {
  res.send(`
    <html>
    <head><meta http-equiv="refresh" content="0;url=/api/portfolio/my-test-id/classification" /></head>
    <body>If you're not redirected, <a href="/api/portfolio/my-test-id/classification">click here</a>.</body>
    </html>
  `);
});

app.use("/api/portfolio", portfolioRouter);

app.listen(port, () => {
  console.log(`-------------Web is listening on port ${port}------------`);
});
