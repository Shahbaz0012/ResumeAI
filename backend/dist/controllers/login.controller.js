"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await prisma_1.default.user.findUnique({
            where: { email },
        });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }
        const match = await bcrypt_1.default.compare(password, user.password);
        if (!match) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }
        const token = jsonwebtoken_1.default.sign({
            userId: user.id,
            email: user.email,
        }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });
        return res.json({
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
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};
exports.login = login;
//# sourceMappingURL=login.controller.js.map