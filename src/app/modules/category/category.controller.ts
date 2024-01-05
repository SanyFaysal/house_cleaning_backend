import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { CategoryService } from "./category.service";
import httpStatus from "http-status";


const createCategory = catchAsync(async (req: Request, res: Response) => {
    const data = req.body;
    const result = await CategoryService.createCategory(data);
    return res.status(httpStatus.OK).json({
        status: true,
        message: "Successful",
        data: result
    })
})
const getAllCategories = catchAsync(async (req: Request, res: Response) => {

    const result = await CategoryService.getAllCategories();
    return res.status(httpStatus.OK).json({
        status: true,
        message: "Successful",
        data: result
    })
})
const updateCategory = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params as { id: string }
    const data = req.body
    const result = await CategoryService.updateCategory(id, data);
    return res.status(httpStatus.OK).json({
        status: true,
        message: "Successful",
        data: result
    })
})
const deleteCategory = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params as { id: string }
    const result = await CategoryService.deleteCategory(id);
    return res.status(httpStatus.OK).json({
        status: true,
        message: "Successful",
        data: result
    })
})

export const CategoryController = {
    createCategory,
    getAllCategories,
    updateCategory,
    deleteCategory
}