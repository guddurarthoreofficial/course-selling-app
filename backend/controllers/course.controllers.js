import { Course } from "../models/course.model.js";
import { v2 as cloudinary } from "cloudinary";
import { Purchase } from "../models/purchase.model.js";

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
      return res
        .status(400)
        .json({ error: "Error uploading file to Cloudinary." });
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

export const updateCourse = async (req, res) => {
  const { courseId } = req.params;
  const { title, description, price, image } = req.body;

  try {
    // First, find the course
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    // Update fields
    course.title = title || course.title;
    course.description = description || course.description;
    course.price = price || course.price;

    // Update image if provided
    if (image) {
      course.image = {
        public_id: image.public_id || course.image.public_id,
        url: image.url || course.image.url,
      };
    }

    // Save the updated course
    await course.save();

    res.status(200).json({ message: "Course updated successfully" });
  } catch (err) {
    console.log("Error in Course updating:", err);
    res.status(500).json({ error: "Error in Course updating" });
  }
};

export const deleteCourse = async (req, res) => {
  const { courseId } = req.params;

  try {
    const course = await Course.findOneAndDelete({ _id: courseId });

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    console.error("Error in course deleting:", error);
    res.status(500).json({ error: "Error deleting course" });
  }
};

export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find({});
    res.status(200).json({ courses });
  } catch (error) {
    console.error("Error fetching courses:", error);
    res.status(500).json({ error: "Error fetching courses" });
  }
};

export const CourseDetails = async (req, res) => {
  const { courseId } = req.params;
  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    res.status(200).json({ course });
  } catch (error) {
    console.error("Error in course details:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

  export const buyCourses = async (req, res) => {
    const { userId } = req;
    // console.log("userId = ",userId);
    const { courseId } = req.params;
    // console.log("courseId = ",courseId);

    try {
      const course = await Course.findById(courseId);

      if (!course) {
        return res.status(404).json({ error: "Course not found" });
      }

      const existingPurchase = await Purchase.findOne({ userId, courseId });

      if (existingPurchase) {
        return res.status(400).json({ error: "User has already purchased this course" });
      }

      const newPurchase = new Purchase({ userId, courseId });
      await newPurchase.save();

      return res.status(201).json({ message: "Course purchased successfully" });
    } catch (error) {
      console.error("Error in course buying:", error);
      return res.status(500).json({ error: "Error buying course" });
    }
  };
