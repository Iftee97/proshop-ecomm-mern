import express from "express";
import {
  loginUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser
} from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", registerUser);
router.get("/", protect, admin, getUsers);

router.post("/login", loginUser);
router.post("/logout", logoutUser);

router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);

router.delete("/:id", protect, admin, deleteUser);
router.get("/:id", protect, admin, getUserById);
router.put("/:id", protect, admin, updateUser);

export default router;
