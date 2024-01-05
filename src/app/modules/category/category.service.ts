import { Category } from "@prisma/client"
import prisma from "../../../shared/prisma"


const createCategory = async (payload: Category) => {
    const result = await prisma.category.create({ data: payload });
    return result;
}
const getAllCategories = async () => {
    const result = await prisma.category.findMany({
        include: {
            service: true
        }
    });
    return result;
};

const updateCategory = async (id: string, data: { title: string }) => {
    const result = await prisma.category.update({
        where: {
            id,
        },
        data
    });
    return result;
};
const deleteCategory = async (id: string) => {
    const result = await prisma.category.delete({
        where: {
            id,
        },

    });
    return result;
};

export const CategoryService = {
    createCategory,
    getAllCategories,
    updateCategory,
    deleteCategory
}