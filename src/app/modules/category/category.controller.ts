import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { CategoryService } from "./category.service";
import httpStatus from "http-status";


const createCategory = catchAsync(async (req: Request, res: Response) => {
    const data = req.body;
    //@ts-ignore
    const image = req.file;
    const categoryData = {
        ...data,
        image
    }
    const result = await CategoryService.createCategory(categoryData);
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
const getCategoryById = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await CategoryService.getCategoryById(id);
    return res.status(httpStatus.OK).json({
        status: true,
        message: "Successful",
        data: result
    })
})
const updateCategory = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params as { id: string }
    const data = req.body
    //@ts-ignore
    const file = req?.file ? req.file : data?.image;
    const categoryData = {
        ...data,
        image: file
    }

    const result = await CategoryService.updateCategory(id, categoryData);
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
    deleteCategory,
    getCategoryById
}