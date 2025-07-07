import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";


import courseRoute from "./routes/course.routes.js";
import userRoute from "./routes/user.routes.js";
import adminRoute from "./routes/admin.routes.js";

import fileUpload from "express-fileupload";
import { v2 as cloudinary } from "cloudinary";
import connectDB from "./config/db.js";

const app = express();
const port = process.env.PORT || 3000;

// middleware
app.use(express.json()); 
app.use(cookieParser());


app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);


//connect to db
connectDB();

// defining routes
app.use("/api/v1/course", courseRoute);
app.use("/api/v1/user",userRoute);
app.use("/api/v1/admin",adminRoute);

// cloudnary configuration code
cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});


app.listen(port, () =>
  console.log(`Server is runnig at port http://localhost:${port}`)
);
