import { Review } from "@prisma/client";
import prisma from "../../../shared/prisma";

const createReview = async (payload: Review) => {
    const result = await prisma.review.create({ data: payload });
    return result;
}

export const ReviewService = {
    createReview
}