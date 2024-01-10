import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { BookingService } from "./booking.service";
import httpStatus from "http-status";

import { ScheduleService } from "../schedule/schedule.service";
import { BOOKING_STATUS, USER_ROLE } from "@prisma/client";

const getAllBookings = catchAsync(async (req: Request, res: Response) => {

    const query = req.query;
    const result = await BookingService.getAllBookings(query)
    return res.status(httpStatus.OK).json({
        status: true,
        message: "Successful",
        data: result
    })

})
const createBooking = catchAsync(async (req: Request, res: Response) => {
    const data = req.body;
    const { id } = req.user as { id: string };
    const payload = {
        ...data,
        userId: id
    }

    const isServiceAvailableWithSchedule = await ScheduleService.getScheduleById(payload?.scheduleId)
    const booking = isServiceAvailableWithSchedule[0]?.booking

    if (booking?.id) {
        return res.status(httpStatus.NOT_ACCEPTABLE).json({
            success: false,
            message: 'Schedule Already Booked'
        });
    } else {
        const result = await BookingService.createBooking(payload);
        return res.status(httpStatus.OK).json({
            status: true,
            message: "Successful",
            data: result
        })
    }
})
const updateBooking = catchAsync(async (req: Request, res: Response) => {
    const data: Record<string, any> = req.body;
    const { id } = req.params as { id: string };
    const { role } = req.user as Record<string, any>;
    if (role === USER_ROLE.USER && data?.status && data?.status !== BOOKING_STATUS.CANCELLED) {
        return res.status(httpStatus.BAD_REQUEST).json({
            status: false,
            message: "You are not authorized",

        })
    }

    const result = await BookingService.updateBooking(id, data);
    return res.status(httpStatus.OK).json({
        status: true,
        message: "Update Successful",
        data: result
    })

})


export const BookingController = {
    createBooking,
    updateBooking,
    getAllBookings
}