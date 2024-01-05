import { Service } from "@prisma/client";
import prisma from "../../../shared/prisma";

const createService = async (data: Service) => {
    const result = await prisma.service.create({ data });
    return result;
}


const getAllService = async () => {
    const result = await prisma.service.findMany({});
    return result;
};

const getServiceDetails = async (id: string) => {
    const result = await prisma.service.findFirst({
        where: {
            id,
        },
        include: {
            schedule: true
        }
    });
    return result;
};
const updateService = async (id: string, data: any) => {
    const result = await prisma.service.update({
        where: {
            id,
        },
        data
    });
    return result;
};


const deleteService = async (id: string) => {
    const result = await prisma.service.delete({
        where: {
            id,
        },
    });
    return result;
};
export const ServiceService = {
    createService,
    getAllService,
    getServiceDetails,
    updateService,
    deleteService
}