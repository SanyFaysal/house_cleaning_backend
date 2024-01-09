
import express from 'express';
import { USER_ROLE } from "@prisma/client";

import auth from "../../middlewares/auth";
import { BookingController } from "./booking.controller";

const router = express.Router();


router.post(
    '/',
    auth(USER_ROLE.USER),
    BookingController.createBooking
);
router.patch(
    '/:id',
    auth(USER_ROLE.USER, USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN),
    BookingController.updateBooking
);

export const BookingRoutes = router
