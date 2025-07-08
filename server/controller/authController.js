import User from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { getDataFromToken } from "../helper/getDataFromToken.js";
import { sendVerifyEmail, sendResetEmail } from "../helper/mailer.js";

// Authentication
export const register = async (req, res) => {
    try {
        const { name, email, contact, password } = req.body;

        const existContact = await User.findOne({ contact });
        if (existContact) {
            return res.status(400).json({ error: "Contact number already exists." });
        }

        const existEmail = await User.findOne({ email });
        if (existEmail) {
            return res.status(400).json({ error: "Email already exists." });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 min
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const lastUser = await User.findOne().sort({ _id: -1 }).limit(1);
        const x = lastUser ? lastUser.uniqueId + 1 : 1;

        const newUser = new User({
            uniqueId: x,
            name,
            email,
            contact,
            password: hashedPassword,
            otp,
            otpExpiry,
        });

        const savedUser = await newUser.save();

        // send verification email
        const userId = savedUser._id;
        await sendVerifyEmail({ email, userId: userId, otp: otp });

        const { password: _, otp: __, otpExpiry: ___, ...safeUser } = savedUser._doc;

        return res.status(201).json({
            message: "Registered! Please verify your email.",
            user: safeUser
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            return res.status(400).json({ error: "User does not exist." });
        }

        if (user.status === "Suspended") {
            return res
                .status(403)
                .json({ error: "Your account has been suspended. Please contact support." });
        }

        if (!user.isVerified) {
            const otp = Math.floor(100000 + Math.random() * 900000).toString();

            await sendVerifyEmail({ email: user.email, userId: user._id, otp });

            return res.status(401).json({
                error:
                    "Please verify your email before logging in.",
            });
        }

        const isValidPassword = await bcryptjs.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(400).json({ error: "Invalid email or password." });
        }

        const token = jwt.sign({ id: user._id }, process.env.SECRET_TOKEN, {
            expiresIn: "100y",
        });

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 100 * 365 * 24 * 60 * 60 * 1000,
            sameSite: "Strict",
            secure: process.env.NODE_ENV === "production",
        });

        return res.status(200).json({
            message: "Logged in successfully.",
            token,
            user: {
                _id: user._id,
                name: user.name,
            },
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const verifyEmail = async (req, res) => {
    try {
        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.status(400).json({ error: "Email and OTP are required." });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: "User not found." });
        }

        if (user.isVerified) {
            return res.status(400).json({ error: "Email already verified." });
        }

        if (!user.otp || !user.otpExpiry) {
            return res.status(400).json({ error: "No OTP found. Please request a new one." });
        }

        const isOtpValid = user.otp === otp;
        const isOtpExpired = user.otpExpiry < Date.now();

        if (!isOtpValid) {
            return res.status(400).json({ error: "Invalid OTP." });
        }

        if (isOtpExpired) {
            return res.status(400).json({ error: "OTP has expired. Please request a new one." });
        }

        user.isVerified = true;
        user.otp = undefined;
        user.otpExpiry = undefined;
        await user.save();

        return res.status(200).json({ message: "Email verified successfully." });
    } catch (error) {
        return res.status(500).json({ error: "Server error: " + error.message });
    }
};

export const logout = async (req, res) => {
    try {
        res.cookie("token", "", { httpOnly: true, expires: new Date(0) });
        return res.status(200).json({ message: "Logged Out Successfully." });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const resendEmail = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ error: "Email is required." });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: "User not found." });
        }

        if (user.isVerified) {
            return res.status(400).json({ error: "User is already verified." });
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        user.otp = otp;
        user.otpExpiry = Date.now() + 10 * 60 * 1000;
        await user.save();

        await sendVerifyEmail({ email: user.email, userId: user._id, otp });

        return res.status(200).json({
            message: "A verification OTP has been sent to your email address.",
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ error: "Email is required." });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "No account found with this email." });
        }

        if (!user.isVerified) {
            return res.status(403).json({ error: "Please verify your email before resetting password." });
        }

        await sendResetEmail({ email, userId: user._id });

        return res.status(200).json({
            message: "Reset password link has been sent to your email address.",
        });
    } catch (error) {
        return res.status(500).json({ error: "Server error: " + error.message });
    }
};

export const myProfile = async (req, res) => {
    try {
        const userId = await getDataFromToken(req);
        const user = await User.findOne({ _id: userId }).select("-password");
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        return res.status(200).json({ message: "User Found", data: user });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const changePassword = async (req, res) => {
    try {
        const { current_password, new_password, confirm_password } = req.body;

        const userId = await getDataFromToken(req);

        const user = await User.findById(userId).select("+password");
        if (!user) {
            return res.status(404).json({ error: "User not found." });
        }

        const isMatch = await bcryptjs.compare(current_password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Current password is incorrect." });
        }

        if (new_password !== confirm_password) {
            return res.status(400).json({ error: "New password and confirm password do not match." });
        }

        if (new_password.length < 6) {
            return res.status(400).json({ error: "Password must be at least 6 characters long." });
        }

        const salt = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash(new_password, salt);
        await user.save();

        return res.status(200).json({ message: "Password changed successfully." });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
