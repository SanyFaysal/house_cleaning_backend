import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { ServiceService } from "./service.service";
import httpStatus from "http-status";
import { uploader } from "../../helpers/imageUploader";
import { IPaginationOptions } from "../../../interfaces/pagination";

const createService = catchAsync(async (req: Request, res: Response) => {
    const data = req.body;
    //@ts-ignore
    const file = req.file;
    const serviceData = {
        image: file,
        ...data
    }
    const result = await ServiceService.createService(serviceData);
    return res.status(httpStatus.OK).json({
        status: true,
        message: "Successful",
        data: result
    })
})
const getAllService = catchAsync(async (req: Request, res: Response) => {
    const { sortBy, sortOrder, limit, page, ...filters } = req.query;
    const options: any = {
        sortBy,
        sortOrder,
        limit,
        page
    }

    const { result, highestPrice, lowestPrice } = await ServiceService.getAllService(filters, options);
    return res.status(httpStatus.OK).json({
        status: true,
        message: "Successful",
        data: result,
        highestPrice,
        lowestPrice
    })
})

const getAllServiceIds = catchAsync(async (req: Request, res: Response) => {
    const result = await ServiceService.getAllServiceIds();
    return res.status(httpStatus.OK).json({
        status: true,
        message: "Successful",
        data: result,

    })
});

const getServiceDetails = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params as { id: string }
    const result = await ServiceService.getServiceDetails(id);
    return res.status(httpStatus.OK).json({
        status: true,
        message: "Successful",
        data: result
    })
})
const getServiceForAddReview = catchAsync(async (req: Request, res: Response) => {
    const { id: userId } = req.user as { id: string }
    const result = await ServiceService.getServiceForAddReview(userId);
    return res.status(httpStatus.OK).json({
        status: true,
        message: "Successful",
        data: result
    })
})
const updateService = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params as { id: string }
    const data = req.body;
    //@ts-ignore
    const file = req?.file ? req.file : data?.image;
    const serviceData = {
        ...data,
        image: file
    }
    const result = await ServiceService.updateService(id, serviceData);
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

const makeComment = catchAsync(async (req: Request, res: Response) => {
    const data = req.body;
    const result = await ServiceService.makeComment(data);
    return res.status(httpStatus.OK).json({
        status: true,
        message: "Successful",
        data: result
    })
})
const getServiceComments = catchAsync(async (req: Request, res: Response) => {
    const { serviceId } = req.params;

    const result = await ServiceService.getServiceComments(serviceId);
    return res.status(httpStatus.OK).json({
        status: true,
        message: "Successful",
        data: result
    })
})
const makeReply = catchAsync(async (req: Request, res: Response) => {
    const data = req.body;
    const result = await ServiceService.makeReply(data);
    return res.status(httpStatus.OK).json({
        status: true,
        message: "Successful",
        data: result
    })
})
export const ServiceController = {
    createService,
    getAllService,
    updateService,
    getServiceDetails,
    getAllServiceIds,
    deleteService,
    getServiceForAddReview,
    makeComment,
    getServiceComments,
    makeReply
}