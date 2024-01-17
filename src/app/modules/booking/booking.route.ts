
import express from 'express';
import { USER_ROLE } from "@prisma/client";

import auth from "../../middlewares/auth";
import { BookingController } from "./booking.controller";

const router = express.Router();


router.get(
    '/',
    auth(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN),
    BookingController.getAllBookings
);
router.get(
    '/all-ids',
    BookingController.getAllBookings
);
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
router.delete(
    '/:id',
    auth(USER_ROLE.USER, USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN),
    BookingController.cancelBooking
);

export const BookingRoutes = router
