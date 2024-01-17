import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";

import { ReviewService } from "./review.service";
import httpStatus from "http-status";

const createReview = catchAsync(async (req: Request, res: Response) => {
    const data = req.body;
    const result = await ReviewService.createReview(data);
    return res.status(httpStatus.OK).json({
        status: true,
        message: "Successful",
        data: result
    })
})
const getAllReviews = catchAsync(async (req: Request, res: Response) => {
    const result = await ReviewService.getAllReviews();
    return res.status(httpStatus.OK).json({
        status: true,
        message: "Successful",
        data: result
    })
})
const getAllReviewIds = catchAsync(async (req: Request, res: Response) => {
    const result = await ReviewService.getAllReviewIds();
    return res.status(httpStatus.OK).json({
        status: true,
        message: "Successful",
        data: result
    })
})

export const ReviewController = {
    createReview,
    getAllReviews,
    getAllReviewIds
}