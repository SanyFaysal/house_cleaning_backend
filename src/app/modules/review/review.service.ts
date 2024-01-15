import { Review } from "@prisma/client";
import prisma from "../../../shared/prisma";

const createReview = async (payload: Review) => {
    const result = await prisma.review.create({ data: payload });
    return result;
}
const getAllReviews = async () => {

    const result = await prisma.review.findMany({
        take: 10,
        include: {
            user: true
        },
        orderBy: {
            createdAt: 'desc'
        }

    });
    return result;
}

export const ReviewService = {
    createReview,
    getAllReviews
}