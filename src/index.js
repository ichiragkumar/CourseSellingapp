import express from "express";
import dotenv from "dotenv"; 
import { connectToDB } from "./config/db/db.js";
import router from "./routes/user.js";
import adminRouter from "./routes/admin.js";
import cors from "cors";
dotenv.config();



const app = express();
const port = process.env.PORT || 3004;


app.use(cors(
  {
    origin: "http://localhost:5173",
    credentials: true,
  }
));
app.use(express.json());
app.use("/api/v1", router);
app.use("/api/v1/admin", adminRouter);




app.listen(port,async () => {
  await connectToDB();
  console.log(`Server is running on port http://localhost:${port}`);
});