
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

export const BookingRoutes = router
