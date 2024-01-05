import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { UserService } from "./user.service";

import httpStatus from "http-status";
import { checkPassword } from "../../helpers/passwordHelpers";
import { jwtHelpers } from "../../helpers/jwtHelpers";
import config from "../../../config";


const signup = catchAsync(async (req: Request, res: Response) => {
    const data = req.body;
    const isUserExist = await UserService.findUserByEmail(data)
    if (isUserExist) {
        return res.status(httpStatus.NOT_ACCEPTABLE).json({
            success: false,
            message: 'User Already existed'
        });
    }

    const result = await UserService.signup(data);

    const { id, role } = result as any;

    const token = jwtHelpers.createToken({ id, role }, config.jwt.secret as string, config.jwt.expires_in as string)
    res.status(httpStatus.OK).json({ status: true, message: "success", data: result, token })

})


const signin = catchAsync(async (req: Request, res: Response) => {
    const data = req.body;
    const user = await UserService.findUserByEmail(data)
    if (!user) {
        return res.status(httpStatus.NOT_FOUND).json({
            success: false,
            message: 'No account found with this email'
        });
    }

    const isPasswordMatched = checkPassword(data.password, user.password as string)

    if (!isPasswordMatched) {
        return res.status(httpStatus.BAD_REQUEST).json({
            success: false,
            message: 'Password not matched'
        });
    }
    const { id, role } = user;
    const token = jwtHelpers.createToken({ id, role }, config.jwt.secret as string, config.jwt.expires_in as string)
    return res.status(httpStatus.BAD_REQUEST).json({
        success: false,
        message: 'Login success',
        token
    });

})

const getMe = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.user as any;
    const result = await UserService.findUserById(id);
    const { password, ...user }: any = result;

    return res.status(httpStatus.OK).json({
        status: true,
        message: "Successful",
        data: user
    })
})
const getAllUser = catchAsync(async (req: Request, res: Response) => {

    const result = await UserService.getAllUser();
    return res.status(httpStatus.OK).json({
        status: true,
        message: "Successful",
        data: result
    })
})
const makeAdmin = catchAsync(async (req: Request, res: Response) => {
    const { userId } = req.params;
    const result = await UserService.makeAdmin(userId);

    return res.status(httpStatus.OK).json({
        status: true,
        message: "Successful",
        data: result
    })
})

export const UserController = {
    signup,
    signin,
    getMe,
    getAllUser,
    makeAdmin
}