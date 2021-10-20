import nodemailer from "nodemailer"
import "dotenv/config"

var transport = nodemailer.createTransport({
    host: process.env.EM_HOST,
    port: process.env.EM_PORT,
    auth: {
      user: process.env.EM_USER,
      pass: process.env.EM_PASS
    }
  });
