import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import Routes from "./routes";
import connectDB from "./utils/connectDB.utils";
import logger from "./utils/logger.utils";
import corsOptions from "./utils/corsOptions";
import setHeaderCredentials from "./middleware/setHeaderCredentials.middleware";

const app = express();

// set acces control res headers
app.use(setHeaderCredentials);

// configure cors
app.use(cors(corsOptions));

// parse the req body
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

//parse the cookies
app.use(cookieParser());

app.get("/", (req, res) => {
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
