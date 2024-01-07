import { connect } from "mongoose";
import logger from "./logger.utils";

const connectDB = async () => {
  try {
    await connect(process.env.MONGO_DB_URL as string);
    logger.info("connected to db");
  } catch (error: any) {
    logger.error(error.message);
  }
};

export default connectDB;
