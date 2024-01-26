

import { v2 as cloudinary } from 'cloudinary';
import { NextFunction, Request, Response } from 'express';
import formidable from 'formidable';
import config from '../../config';

export const uploader = async (req: Request, res: Response, next: NextFunction) => {
    try {

        const form = formidable({ multiples: false });
        form.parse(req, async (err, fields: any, files: any) => {
            const cloudinaryConfig = {
                cloud_name: config.cloudinary.cloud_name,
                api_key: config.cloudinary.api_key,
                api_secret: config.cloudinary.api_secret,
            };
            if (files?.image) {
                const response = await cloudinary.uploader.upload(
                    files.image[0].filepath,
                    cloudinaryConfig
                );
                if (!response.url) {
                    return res.status(400).json({
                        status: 0,
                        error: "Something went wrong",
                    });
                }

                //@ts-ignore
                req.file = response.url;
            }
            req.body = JSON.parse(fields?.data[0]);
            next()
        });
    } catch (error: any) {
        return res.status(401).json({
            status: 0,
            error: error.message,
        });
    }
};
