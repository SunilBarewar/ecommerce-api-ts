import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import Routes from "./routes";
import connectDB from "./utils/connectDB.utils";
import logger from "./utils/logger.utils";

const app = express();

app.use(express.json());

app.use(cookieParser());

app.use(cors());

app.get("/health-check", (req, res) => {
  res.status(200).json({ message: "server started" });
});

app.use("/api", Routes);

async function bootstrap() {
  await connectDB();
  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    logger.info("server running on port ", port);
  });
}

bootstrap();
