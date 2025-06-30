import {Course} from '../models/course.model.js';

export const createCourse = async (req, res) => {

  console.log("course is created");
  const { title, description, price, image } = req.body;

  try {
    if (!title || !description || !price || !image) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const courseData = {
      title,
      description,
      price,
      image,
    };

    const course = await Course.create(courseData);

    res.json({
      message: "Course created successfully",
      course,
    });
    
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Error creating course" });
  }
};
