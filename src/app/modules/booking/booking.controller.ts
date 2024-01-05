import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { BookingService } from "./booking.service";
import httpStatus from "http-status";

import { ScheduleService } from "../schedule/schedule.service";

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


export const BookingController = {
    createBooking
}