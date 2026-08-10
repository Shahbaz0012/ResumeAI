"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfile = exports.getProfile = exports.login = exports.register = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// ==========================================
// REGISTER
// ==========================================
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }
        const existingUser = await prisma_1.default.user.findUnique({
            where: { email },
        });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const user = await prisma_1.default.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });
        return res.status(201).json({
            success: true,
            message: "User Registered Successfully",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        });
    }
    catch (error) {
        console.error("========== REGISTER ERROR ==========");
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server Error",
        });
    } // <-- YE BRACKETS MISSING THE
}; // <-- YE BHI MISSING THA
exports.register = register;
// ==========================================
// LOGIN
// ==========================================
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and Password are required",
            });
        }
        const user = await prisma_1.default.user.findUnique({
            where: { email },
        });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Invalid Email or Password",
            });
        }
        const isMatch = await bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid Email or Password",
            });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "7d" });
        return res.status(200).json({
            success: true,
            message: "Login Successful",
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        });
    }
    catch (error) {
        console.error("========== LOGIN ERROR ==========");
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
}; // <-- YAHAN DUPLICATE CODE THA JO HATA DIYA HAI
exports.login = login;
// ==========================================
// GET PROFILE
// ==========================================
const getProfile = async (req, res) => {
    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }
        const user = await prisma_1.default.user.findUnique({
            where: { id: req.userId },
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true,
                updatedAt: true,
            },
        });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }
        return res.status(200).json({
            success: true,
            user,
        });
    }
    catch (error) {
        console.error("========== GET PROFILE ERROR ==========");
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};
exports.getProfile = getProfile;
// ==========================================
// UPDATE PROFILE
// ==========================================
const updateProfile = async (req, res) => {
    try {
        if (!req.userId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }
        const { name, email } = req.body;
        if (!name || !email) {
            return res.status(400).json({
                success: false,
                message: "Name and email are required.",
            });
        }
        const existingUser = await prisma_1.default.user.findFirst({
            where: {
                email,
                NOT: { id: req.userId },
            },
        });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email is already in use.",
            });
        }
        const user = await prisma_1.default.user.update({
            where: { id: req.userId },
            data: {
                name: name.trim(),
                email: email.trim(),
            },
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true,
                updatedAt: true,
            },
        });
        return res.status(200).json({
            success: true,
            message: "Profile updated successfully.",
            user,
        });
    }
    catch (error) {
        console.error("========== UPDATE PROFILE ERROR ==========");
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};
exports.updateProfile = updateProfile;
//# sourceMappingURL=auth.controller.js.map