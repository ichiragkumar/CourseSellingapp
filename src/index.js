import express from "express";
import dotenv from "dotenv"; 
import { connectToDB } from "./config/db/db.js";
import router from "./routes/user.js";
import adminRouter from "./routes/admin.js";
dotenv.config();



const app = express();
const port = process.env.PORT || 3004;

app.use(express.json());
app.use("/api/v1", router);
app.use("/api/v1/admin", adminRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});





app.listen(port,async () => {
  await connectToDB();
  console.log(`Server is running on port http://localhost:${port}`);
});