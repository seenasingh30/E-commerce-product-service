import { Response } from 'express';

export function successResponse(res: Response, data: Object = [], meta: Object = {}, status: number = 200) {
    return res.status(status).send({
        success: status >= 300 ? false : true,
        data,
        meta
    });
}