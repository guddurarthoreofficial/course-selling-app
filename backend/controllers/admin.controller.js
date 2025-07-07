import { Admin } from "../models/admin.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as z from "zod/v4";
import "dotenv/config";

export const signup = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  const AdminSchema = z.object({
    firstName: z
      .string()
      .min(3, { message: "First name must be at least 3 characters long" }),
    lastName: z
      .string()
      .min(3, { message: "Last name must be at least 3 characters long" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" }),
  });

  const validateData = AdminSchema.safeParse(req.body);

  if (!validateData.success) {
    return res.status(400).json({
      errors: validateData.error.issues.map((err) => err.message),
    });
  }

  try {
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ error: "Admin already exists" });
    }

    // Hash only after validation passed
    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    await newAdmin.save();
    res.status(201).json({ message: "Signup succeeded", admin: newAdmin });
  } catch (error) {
    console.error("Error in signup", error);
    return res.status(500).json({ error: "Server error during signup" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(403).json({ errors: "Invalid credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, admin.password);

    if (!isPasswordCorrect) {
      return res.status(403).json({ errors: "Invalid credentials" });
    }

    // jwt code
    const token = jwt.sign(
      {
        id: admin._id,
      },
      process.env.JWT_SECRET_ADMIN,
      { expiresIn: "1d" }
    );

    // save in cookie
    res.cookie("jwt", token, {
      httpOnly: true, // Recommended: protects from XSS
      secure: process.env.NODE_ENV == "production", // Recommended in production: sends only over HTTPS
      sameSite: "strict", // Recommended: mitigates CSRF
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ message: "Login successful", admin, token });
  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).json({ error: "Error in login" });
  }
};

export const logout = async (req, res) => {
  try {
    if (!req.cookies.jwt) {
      return res.status(401).json({ error: "login first" });
    }
    res.clearCookie("jwt");
    return res.status(200).json({ message: "Logout successfully" });
  } catch (error) {
    console.error("Error in logout:", error);
    return res.status(500).json({ error: "Error in logout" });
  }
};
