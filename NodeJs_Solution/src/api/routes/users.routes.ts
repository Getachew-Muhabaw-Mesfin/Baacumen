import express from "express";
import { register, login } from "../../controller/users.controller";

const router = express.Router();

/**
 * Create a new user
 */
router.post("/register", register as any);

router.post("/login", login as any);

export default router;
