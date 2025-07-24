import express from "express";
import noteRoutes from "./routes/noteRoutes.js"; 
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT || 5001;


//middleware
app.use(cors({
  origin:"http://localhost:5173",
}));
app.use(express.json());    
app.use(rateLimiter);


//app.use((req,res,next) => {
//    console.log(`Req method is ${req.method} and req url is ${req.url}`);
//    next();
//});

app.use("/api/notes", noteRoutes);

connectDB().then(() => {
  app.listen(process.env.PORT, () => {
    console.log("Server started in port:", port);
  });
});




