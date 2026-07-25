const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");

const connectDB = require("../config/db");
const Admin = require("../models/Admin");

dotenv.config();

connectDB();

const createAdmin = async () => {
  try {
    const email = "admin@leaddesk.com";
    const password = "Admin@123";

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      console.log("✅ Admin already exists");
      process.exit();
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create admin
    await Admin.create({
      email,
      password: hashedPassword,
    });

    console.log("✅ Admin created successfully!");
    console.log("Email:", email);
    console.log("Password:", password);

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

createAdmin();