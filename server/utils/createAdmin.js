const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");

const connectDB = require("../config/db");
const Admin = require("../models/Admin");

dotenv.config();

connectDB();

const createAdmin = async () => {
  try {
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;

    if (!email || !password) {
      process.exit(1);
    }

    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      process.exit();
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await Admin.create({
      email,
      password: hashedPassword,
    });

    process.exit();
  } catch (error) {
    process.exit(1);
  }
};

createAdmin();
