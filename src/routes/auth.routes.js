import { Router } from "express";
import {
  login,
  logout,
  profile,
  register,
  verifyToken,
} from "../controllers/auth.controller.js";

import { authRequire } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validatorMiddleware.js";
import { loginSchema, registerSchema } from "../schemas/auth.schema.js";

import {upload} from '../middlewares/multerMiddleware.js'

const router = Router();

router.post("/register", upload.single('profileImage'),validateSchema(registerSchema), register);
router.post("/login", validateSchema(loginSchema), login);
router.post("/logout", authRequire, logout);

router.get("/verify",verifyToken)

router.get("/profile", authRequire, profile);

export default router;
