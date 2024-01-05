

import { USER_ROLE } from "@prisma/client";
import auth from "../../middlewares/auth";

import express from 'express';
import { CategoryController } from "./category.controller";

const router = express.Router();



router.post(
    '/',
    auth(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN),
    CategoryController.createCategory
);
router.get(
    '/all',
    auth(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN),
    CategoryController.getAllCategories
);
router.patch(
    '/:id',
    auth(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN),
    CategoryController.updateCategory
);





export const CategoryRoutes = router;