

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
    CategoryController.getAllCategories
);
router.patch(
    '/:id',
    auth(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN),
    CategoryController.updateCategory
);

router.delete(
    '/:id',
    auth(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN),
    CategoryController.deleteCategory
);





export const CategoryRoutes = router;