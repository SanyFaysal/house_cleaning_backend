import { Prisma, USER_ROLE, User } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { hashPassword } from "../../helpers/passwordHelpers";


const signup = async (payload: User) => {
    let hashPass = hashPassword(payload.password as string)
    const data = {
        ...payload,
        password: hashPass
    }
    const result = await prisma.user.create({
        data
    })
    return result;

}
const findUserByEmail = async (payload: User) => {
    console.log({ payload })
    const result = await prisma.user.findUnique({ where: { email: payload.email } })
    return result;
}
const findUserById = async (id: string) => {
    const result = await prisma.user.findUnique({
        where: {
            id: id
        },
        include: {
            booking: {
                include: {
                    service: {
                        select: {
                            serviceName: true,
                            price: true
                        }
                    },
                    schedule: {
                        select: {
                            startTime: true,
                            endTime: true,
                            date: true
                        }
                    }
                }
            }
        }
    })
    return result;
}
const getAllUser = async () => {
    const result = await prisma.user.findMany({
        where: {
            role: USER_ROLE.USER
        },
        select: {
            id: true,
            fullName: true,
            email: true,
            phoneNumber: true,
            role: true,
            createdAt: true,
            updatedAt: true,
            password: false
        },

    })
    return result;
}
const makeAdmin = async (id: string) => {
    const result = await prisma.user.update({
        where: {
            id
        },
        data: {
            role: USER_ROLE.ADMIN
        },
        select: {
            id: true,
            fullName: true,
            email: true,
            phoneNumber: true,
            role: true,
            createdAt: true,
            updatedAt: true,
            password: false
        }
    })
    return result;
}

export const UserService = {
    signup,
    findUserByEmail,
    findUserById,
    getAllUser,
    makeAdmin,
}