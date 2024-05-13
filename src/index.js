import express from "express";
import cookieParser from "cookie-parser";
import { connect } from "../config/db.js";
import userRouter from "../routes/userRoutes.js";
import dotenv from "dotenv";
import instructorRouter from "../routes/instructorRoutes.js";
import cors from "cors"

const app = express();

// http://localhost:5173/ 
const corsOptions = {
  origin: 'http://localhost:5173',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
};


dotenv.config();
app.use(express.json());
app.use(cookieParser())
app.use(cors(corsOptions));
app.use("/api/v1/user", userRouter);
app.use("/api/v1/instructor", instructorRouter);

const port =process.env.PORT || 3000;
connect();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
