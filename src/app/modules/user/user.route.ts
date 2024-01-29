import { USER_ROLE } from "@prisma/client";
import auth from "../../middlewares/auth";
import { UserController } from "./user.controller";
import express from 'express';

const router = express.Router();


router.post('/signup', UserController.signup);
router.post('/signin', UserController.signin);


router.get('/me', auth(), UserController.getMe);
router.get(
    '/all',
    auth(USER_ROLE.ADMIN,
        USER_ROLE.SUPER_ADMIN),
    UserController.getAllUser);



router.patch(
    '/make-admin/:userId',
    auth(USER_ROLE.SUPER_ADMIN),
    UserController.makeAdmin
);



router.post(
    '/cart',
    auth(USER_ROLE.USER),
    UserController.addToCart);
router.get(
    '/cart/all',
    auth(USER_ROLE.USER),
    UserController.getCart);
router.delete(
    '/cart/:id',
    auth(USER_ROLE.USER),
    UserController.removeCartService);


export const UserRoutes = router;