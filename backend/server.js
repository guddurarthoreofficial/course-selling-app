import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import courseRouter from './routes/course.routes.js';
import fileUpload from "express-fileupload";
import { v2 as cloudinary } from 'cloudinary'


const app = express();
const port = process.env.PORT || 3000;

// middleware  
app.use(express.json());
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));


const DB_URI = process.env.MONGO_URI;

//connect to db
try {
  await mongoose.connect(DB_URI);
  console.log("Connected to mongoDB");
} catch (err) {
  console.log(err);
}


// defining routes
app.use("/api/v1/course",courseRouter)


// cloudnary configuration code
cloudinary.config({ 
  cloud_name: process.env.cloud_name, 
  api_key:process.env.api_key, 
  api_secret:process.env.api_secret
});


app.get("/", (req, res) => res.send("Hello World!"));




app.listen(port, () => console.log(`Server is runnig at port http://localhost:${port}`));
