import auth from "../../middlewares/auth";
import { UserController } from "./user.controller";
import express from 'express';

const router = express.Router();


router.post('/signup', UserController.signup);
router.post('/signin', UserController.signin);
router.get('/me', auth(), UserController.getMe);


export const UserRoutes = router;