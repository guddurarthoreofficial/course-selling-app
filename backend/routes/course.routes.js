import express from "express";
import { buyCourses, CourseDetails, createCourse, deleteCourse, getCourses, updateCourse } from "../controllers/course.controllers.js";
import userMiddleware from "../middlewares/user.mid.js";

const router = express.Router();

router.post('/create',createCourse);
router.put('/update/:courseId',updateCourse);
router.delete('/delete/:courseId',deleteCourse);
router.get('/courses/',getCourses);
// router.get('/:courseId/',CourseDetails);

router.post("/buy/:courseId",userMiddleware,buyCourses)


export default router;