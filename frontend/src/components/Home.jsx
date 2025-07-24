import React, { useEffect, useState } from 'react';
import logo from '/logo.png';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import axios from 'axios';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";


function Home() {
    const [courses, setCourses] = React.useState([]);


    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get('http://localhost:4001/api/v1/course/courses', {
                    withCredentials: true, // Include cookies in the request
                });
                setCourses(response.data.courses); 
                console.log("Courses:", response.data.courses);
            } catch (err) {
                console.error("Error fetching courses:", err);
            }
        };
        fetchCourses();
    }, []);


    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        autoplay: true,
        // autoplaySpeed: 2000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            }, {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };


    return (
        <div className="bg-gradient-to-r from-black to-blue-950">
            <div className="h-screen text-white container mx-auto">

                {/* Header */}
                <header className="flex items-center justify-between p-6">
                    <div className="flex items-center space-x-2">
                        <img src={logo} alt="" className="w-10 h-10 rounded-full" />
                        <h1 className="text-2xl text-orange-500 font-bold">CourseHaven</h1>
                    </div>
                    <div className="space-x-4">
                        <Link
                            to="/login"
                            className="bg-transparent text-white py-2 px-4 border border-white rounded"
                        >
                            Login
                        </Link>
                        <Link
                            to="/signup"
                            className="bg-transparent text-white py-2 px-4 border border-white rounded"
                        >
                            Signup
                        </Link>
                    </div>
                </header>

                {/* main  */}
                <section className="text-center py-20">
                    <h1 className="text-4xl font-semibold text-orange-500">
                        CourseHaven
                    </h1>

                    <br />

                    <p className="text-gray-500">
                        Sharpen your skills with courses crafted by experts.
                    </p>

                    <div className="space-x-4 mt-8">
                        <button className="bg-green-500 text-white py-3 px-6 rounded font-semibold hover:bg-white duration-300 hover:text-black">
                            Explore courses
                        </button>

                        <button className="bg-white text-black py-3 px-6 rounded font-semibold hover:bg-green-500 duration-300 hover:text-white">
                            Courses videos
                        </button>
                    </div>
                </section>


                {/* Courses Slider */}
                {/* <section>
                    <Slider {...settings}>
                        {courses.map((course) => (
                            <div className="p-4" key={course._id}>
                                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                                    <img
                                        src={course.image.url}
                                        alt={course.title}
                                        className="w-full h-64 object-cover rounded-t-lg"
                                    />
                                    <div className="p-4">
                                        <h2 className="text-lg font-semibold text-gray-800">{course.title}</h2>
                                        <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                                            Enroll Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </section> */}


                {/* Footer */}
                <footer className="my-12">
                    <div className="grid grid-cols-1 md:grid-cols-3">
                        <div className="flex flex-col items-center md:items-start">
                            <div className="flex items-center space-x-2">
                                <img src={logo} alt="" className="w-10 h-10 rounded-full" />
                                <h1 className="text-2xl text-orange-500 font-bold">
                                    CourseHaven
                                </h1>
                            </div>
                            <div className="mt-3 ml-2 md:ml-8">
                                <p className="mb-2">Follow us</p>
                                <div className="flex space-x-4">
                                    <a href="">
                                        <FaFacebook className="text-2xl hover:text-blue-400 duration-300" />
                                    </a>
                                    <a href="">
                                        <FaInstagram className="text-2xl hover:text-pink-600 duration-300" />
                                    </a>
                                    <a href="">
                                        <FaTwitter className="text-2xl hover:text-blue-600 duration-300" />
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="items-center mt-6 md:mt-0 flex flex-col">
                            <h3 className="text-lg font-semibold md:mb-4">connects</h3>
                            <ul className=" space-y-2 text-gray-400">
                                <li className="hover:text-white cursor-pointer duration-300">
                                    Guddu Singh
                                </li>
                                <li className="hover:text-white cursor-pointer duration-300">
                                    Telegram-Guddu Singh
                                </li>
                                <li className="hover:text-white cursor-pointer duration-300">
                                    Github-Guddu Singh
                                </li>
                            </ul>
                        </div>
                        <div className="items-center mt-6 md:mt-0 flex flex-col">
                            <h3 className="text-lg font-semibold mb-4">
                                copyrights &#169; 2024
                            </h3>
                            <ul className=" space-y-2 text-center text-gray-400">
                                <li className="hover:text-white cursor-pointer duration-300">
                                    Terms & Conditions
                                </li>
                                <li className="hover:text-white cursor-pointer duration-300">
                                    Privacy Policy
                                </li>
                                <li className="hover:text-white cursor-pointer duration-300">
                                    Refund & Cancellation
                                </li>
                            </ul>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
}

export default Home;
