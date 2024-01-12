

import { USER_ROLE } from "@prisma/client";
import auth from "../../middlewares/auth";

import express from 'express';
import { ServiceController } from "./service.controller";
import { uploader } from "../../helpers/imageUploader";


const router = express.Router();



router.post(
    '/',
    auth(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN),
    uploader,
    ServiceController.createService
);
router.get(
    '/all',
    ServiceController.getAllService
);

router.get(
    '/availableForReview',
    auth(USER_ROLE.USER),
    ServiceController.getServiceForAddReview
);
router.get(
    '/comment/:serviceId',
    ServiceController.getServiceComments
);
router.get(
    '/:id',
    ServiceController.getServiceDetails
);

router.patch(
    '/:id',
    auth(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN),
    uploader,
    ServiceController.updateService
);
router.delete(
    '/:id',
    auth(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN),
    ServiceController.deleteService
);

router.post(
    '/comment',
    auth(),
    ServiceController.makeComment
);



export const ServiceRoutes = router;