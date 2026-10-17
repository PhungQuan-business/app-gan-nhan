import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

function sentOtpToEmail(email: string, otp: string): boolean {
  // Create a transporter object using SMTP transport
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  // Setup email data
  const mailOptions = {
    from: process.env.SMTP_FROM, // sender address
    to: email, // list of receivers
    subject: 'Your OTP Code', // Subject line
    text: `Your OTP code is ${otp}. It will expire in 5 minutes.`, // plain text body
  };

  // Send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending OTP email:', error);
      return false;
    }
    console.log('OTP email sent:', info.response);
    return true;
  });

  return true; // Assuming the email was sent successfully for now
}

export default sentOtpToEmail;

// For debugging purposes, run this file directly in Javascript debug terminal to see a generated OTP.
import { fileURLToPath } from "node:url";
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  console.log(sentOtpToEmail("phunghongquan.business@gmail.com", "123456")); // Replace with a valid email for testing
}