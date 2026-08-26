import express from "express";
import {
  register,
  login,
} from "../controllers/authController.js";

const router = express.Router();

route.post("/register", register);
route.post("/login", login);

export default router;