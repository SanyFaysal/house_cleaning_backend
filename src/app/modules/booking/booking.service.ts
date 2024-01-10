import { BOOKING_STATUS, Booking, Prisma } from "@prisma/client"
import prisma from "../../../shared/prisma"
import { PrismaClientOptions } from "@prisma/client/runtime/library";


const createBooking = async (payload: Booking) => {


    const result = await prisma.booking.create({ data: payload });
    return result;
}
const updateBooking = async (id: string, data: Partial<Booking>) => {
    const result = await prisma.booking.update({
        where: {
            id,
        }, data
    });
    return result;
}
const getAllBookings = async (query: any) => {
    const andConditions: any[] = [];
    if (Object.keys(query)?.length > 0) {
        Object.keys(query)?.map(key => {
            andConditions.push({
                [key]: query[key]
            })
        })
    }

    const whereConditions: any = andConditions?.length > 0 ? { AND: andConditions } : {};
    console.log(whereConditions)
    const result = await prisma.booking.findMany({
        where: whereConditions,
        include: {
            service: true,
            schedule: true
        },

    });
    return result;
}

export const BookingService = {
    createBooking,
    updateBooking,
    getAllBookings
}