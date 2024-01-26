

import { USER_ROLE } from "@prisma/client";
import auth from "../../middlewares/auth";

import express from 'express';
import { CategoryController } from "./category.controller";
import { uploader } from "../../middlewares/imageUploader";

const router = express.Router();
router.post(
    '/',
    auth(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN),
    uploader,
    CategoryController.createCategory
);
router.get(
    '/all',
    CategoryController.getAllCategories
);
router.get(
    '/:id',
    CategoryController.getCategoryById
);
router.patch(
    '/:id',
    auth(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN),
    uploader,
    CategoryController.updateCategory
);

router.delete(
    '/:id',
    auth(USER_ROLE.ADMIN, USER_ROLE.SUPER_ADMIN),
    CategoryController.deleteCategory
);





export const CategoryRoutes = router;