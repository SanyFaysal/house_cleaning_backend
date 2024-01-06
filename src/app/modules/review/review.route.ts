import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '@prisma/client';
import { ReviewController } from './reveiw.controller';

const router = express.Router();

router.post(
    '/',
    auth(USER_ROLE.USER),
    ReviewController.createReview
);

export const ReviewRoutes = router;