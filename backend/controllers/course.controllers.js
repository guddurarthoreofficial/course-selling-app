import { Course } from '../models/course.model.js';
import { v2 as cloudinary } from 'cloudinary';

export const createCourse = async (req, res) => {
  console.log("course is created");

  try {
    // Ensure req.files exists
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const { image } = req.files;
    const { title, description, price } = req.body;

    // Validate fields
    if (!title || !description || !price || !image) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const allowedFormats = ["image/png", "image/jpg", "image/jpeg"];
    if (!allowedFormats.includes(image.mimetype)) {
      return res.status(400).json({
        error: "Invalid file format. Only PNG and JPG are allowed.",
      });
    }

    // Upload to Cloudinary
    const cloudResponse = await cloudinary.uploader.upload(image.tempFilePath);

    if (!cloudResponse || cloudResponse.error) {
      return res.status(400).json({ error: "Error uploading file to Cloudinary." });
    }

    // Create Course
    const courseData = {
      title,
      description,
      price,
      image: {
        public_id: cloudResponse.public_id,
        url: cloudResponse.secure_url,
      },
    };

    const course = await Course.create(courseData);

    res.json({
      message: "Course created successfully",
      course,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error creating course" });
  }
};











// import {Course} from '../models/course.model.js';
// import { v2 as cloudinary } from 'cloudinary'


// export const createCourse = async (req, res) => {

//   console.log("course is created");
//   const { title, description, price } = req.body;

//   try {
//     if (!title || !description || !price || !image) {
//       return res.status(400).json({ error: "All fields are required" });
//     }

//     const  { image }= req.files;
//     if(!req.files || Object.keys(req.files).length === 0){
//       return res.status(400).json({error:"No file uploaded"});
//     }

//     const allowedFormat = ["image/png","image/jpg"];

//     if(!allowedFormat.includes(image.mimetype)){
//       return res.status(400).json({error:"Invalid file format. Only PNG JPG are allowed"})
//     }

    
//     // cloudinary code 
//     const cloud_response = await cloudinary.uploader.upload(image.tempFilePath);
//     if(!cloud_response || cloud_response.error){
//       return res.status(400).json({error: "Error uploading file to cloudnary"});
//     }

//     const courseData = {
//       title,
//       description,
//       price,
//       image:{
//         public_id:cloud_response.public_id,
//         url:cloud_response.url,
//       }
//     };

//     const course = await Course.create(courseData);

//     res.json({
//       message: "Course created successfully",
//       course,
//     });
    
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: "Error creating course" });
//   }
// };
