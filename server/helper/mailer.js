import User from "../models/userModel.js";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();

const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS,
    },
});

export const sendVerifyEmail = async ({ email, userId, otp }) => {
    try {
        await User.findByIdAndUpdate(userId, {
            $set: {
                otp: otp,
                otpExpiry: Date.now() + 10 * 60 * 1000, // 10 minutes
            },
        });

        const verifyLink = `${process.env.DASHBOARD_URL}/verify-otp?email=${email}`;

        const mailOptions = {
            from: process.env.MAIL_FROM || "no-reply@example.com",
            to: email,
            subject: "Verify Your Email",
            html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
          <div style="max-width: 600px; margin: auto; background: white; padding: 30px; border-radius: 8px;">
            <h2>Email Verification</h2>
            <p>Your OTP is: <strong style="font-size: 20px;">${otp}</strong></p>
            <p>Or click the button below to verify:</p>
            <a href="${verifyLink}" style="padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">Verify Email</a>
            <p style="margin-top: 15px; color: #888;">If you didn’t request this, you can ignore this email.</p>
          </div>
        </div>
      `,
        };

        return await transport.sendMail(mailOptions);
    } catch (error) {
        throw new Error("Error sending verification email: " + error.message);
    }
};

export const sendResetEmail = async ({ email, userId }) => {
    try {
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);

        await User.findByIdAndUpdate(userId, {
            $set: {
                forgotOrResetPasswordToken: hashedToken,
                forgotOrResetPasswordTokenExpiry: Date.now() + 60 * 60 * 1000, // 1 hour
            },
        });

        const resetLink = `${process.env.DASHBOARD_URL}/reset-password?token=${hashedToken}`;

        const mailOptions = {
            from: process.env.MAIL_FROM || "no-reply@example.com",
            to: email,
            subject: "Reset Your Password",
            html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
          <div style="max-width: 600px; margin: auto; background: white; padding: 30px; border-radius: 8px;">
            <h2>Password Reset</h2>
            <p>Click the button below to reset your password:</p>
            <a href="${resetLink}" style="padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">Reset Password</a>
            <p style="margin-top: 15px; color: #888;">If you didn’t request this, you can ignore this email.</p>
          </div>
        </div>
      `,
        };

        return await transport.sendMail(mailOptions);
    } catch (error) {
        throw new Error("Error sending reset email: " + error.message);
    }
};
