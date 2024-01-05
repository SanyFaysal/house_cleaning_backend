import { Schedule } from "@prisma/client"
import prisma from "../../../shared/prisma"


const createSchedule = async (payload: Schedule) => {
    const result = await prisma.schedule.create({ data: payload });
    return result;
}
const getScheduleById = async (id: string) => {
    const result = await prisma.schedule.findMany({
        where: {
            id
        },
        include: {
            booking: true
        }
    });
    return result;
};

const updateSchedule = async (id: string, data: { title: string }) => {
    const result = await prisma.schedule.update({
        where: {
            id,
        },
        data
    });
    return result;
};
const deleteSchedule = async (id: string) => {
    const result = await prisma.schedule.delete({
        where: {
            id,
        },

    });
    return result;
};

export const ScheduleService = {
    createSchedule,
    getScheduleById,
    updateSchedule,
    deleteSchedule
}