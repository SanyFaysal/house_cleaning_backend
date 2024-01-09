import { Booking } from "@prisma/client"
import prisma from "../../../shared/prisma"


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

export const BookingService = {
    createBooking,
    updateBooking
}