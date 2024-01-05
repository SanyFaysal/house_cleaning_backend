

import { USER_ROLE } from "@prisma/client";
import auth from "../../middlewares/auth";

import express from 'express';
import { ScheduleController } from "./schedule.controller";

const router = express.Router();


router.post(
    '/',
    auth(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN),
    ScheduleController.createSchedule
);
router.get(
    '/:id',
    ScheduleController.getScheduleById
);
router.patch(
    '/:id',
    auth(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN),
    ScheduleController.updateSchedule
);

router.delete(
    '/:id',
    auth(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN),
    ScheduleController.deleteSchedule
);





export const ScheduleRoutes = router;