import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";

import httpStatus from "http-status";
import { ScheduleService } from "./schedule.service";


const createSchedule = catchAsync(async (req: Request, res: Response) => {
    const data = req.body;
    const result = await ScheduleService.createSchedule(data);
    return res.status(httpStatus.OK).json({
        status: true,
        message: "Successful",
        data: result
    })
})
const getServiceSchedule = catchAsync(async (req: Request, res: Response) => {
    const { serviceId } = req.params;
    const result = await ScheduleService.getServiceSchedule(serviceId);
    return res.status(httpStatus.OK).json({
        status: true,
        message: "Successful",
        data: result
    })
})
const updateSchedule = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params as { id: string }
    const data = req.body
    const result = await ScheduleService.updateSchedule(id, data);
    return res.status(httpStatus.OK).json({
        status: true,
        message: "Successful",
        data: result
    })
})
const deleteSchedule = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params as { id: string }
    const result = await ScheduleService.deleteSchedule(id);
    return res.status(httpStatus.OK).json({
        status: true,
        message: "Successful",
        data: result
    })
})

export const ScheduleController = {
    createSchedule,
    getServiceSchedule,
    updateSchedule,
    deleteSchedule,

}