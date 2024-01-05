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
    res.json({ result })

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
    const { id, role, email } = user;
    const token = jwtHelpers.createToken({ id, role, email }, config.jwt.secret as string, config.jwt.expires_in as string)
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
export const UserController = {
    signup,
    signin,
    getMe
}