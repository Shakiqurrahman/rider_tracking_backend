/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import type { RequestHandler } from 'express';
import httpStatus from 'http-status';

const notFoundHandler: RequestHandler = (req, res, next) => {
    res.status(httpStatus.NOT_FOUND).json({
        success: false,
        message: 'Api endpoint not found!',
    });
};

export default notFoundHandler;