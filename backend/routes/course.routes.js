import express from "express";
import { CourseDetails, createCourse, deleteCourse, getCourses, updateCourse } from "../controllers/course.controllers.js";

const router = express.Router();

router.post('/create',createCourse);
router.put('/update/:courseId',updateCourse);
router.delete('/delete/:courseId',deleteCourse);
router.get('/courses/',getCourses);
router.get('/:courseId/',CourseDetails);


export default router;