import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { ServiceService } from "./service.service";
import httpStatus from "http-status";

const createService = catchAsync(async (req: Request, res: Response) => {
    const data = req.body;
    const result = await ServiceService.createService(data);
    return res.status(httpStatus.OK).json({
        status: true,
        message: "Successful",
        data: result
    })
})
const getAllService = catchAsync(async (req: Request, res: Response) => {

    const result = await ServiceService.getAllService();
    return res.status(httpStatus.OK).json({
        status: true,
        message: "Successful",
        data: result
    })
})
const getServiceDetails = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params as { id: string }
    const result = await ServiceService.getServiceDetails(id);
    return res.status(httpStatus.OK).json({
        status: true,
        message: "Successful",
        data: result
    })
})
const updateService = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params as { id: string }
    const data = req.body
    const result = await ServiceService.updateService(id, data);
    return res.status(httpStatus.OK).json({
        status: true,
        message: "Successful",
        data: result
    })
})


const deleteService = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params as { id: string }
    await ServiceService.deleteService(id);
    return res.status(httpStatus.OK).json({
        status: true,
        message: "Successful",

    })
})

export const ServiceController = {
    createService,
    getAllService,
    updateService,
    getServiceDetails,
    deleteService
}