import { User } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { hashPassword } from "../../helpers/passwordHelpers";




const signup = async (payload: User) => {
    let hashPass = hashPassword(payload.password as string)
    const data = {
        ...payload,
        password: hashPass
    }
    const result = await prisma.user.create({ data })
    return result;

}
const findUserByEmail = async (payload: User) => {
    const result = await prisma.user.findUnique({ where: { email: payload.email } })
    return result;
}
const findUserById = async (id: string) => {
    const result = await prisma.user.findUnique({
        where: {
            id: id
        }
    })
    return result;
}

export const UserService = {
    signup,
    findUserByEmail,
    findUserById
}