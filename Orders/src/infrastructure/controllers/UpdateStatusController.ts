import { Request, Response } from 'express';
import { BaseResponse } from '../../application/dtos/response/BaseResponse';
import { UpdateStatusUseCase } from '../../application/useCases/UpdateStatusUseCase';
import { UpdateStatusRequest } from '../../application/dtos/request/UpdateStatusRequest';

export class UpdateStatusController {
    constructor(readonly useCase: UpdateStatusUseCase) { }

    async execute(req: Request, res: Response) {
        const {status } = req.body;
        const {uuid} = req.params;
        if(status !== 'paid' && status !== 'created' && status !== 'sent'){
            const baseResponse = new BaseResponse(null, "Invalid status", false, 400);
            return res.status(baseResponse.statusCode).json(baseResponse);
        }
        const request = new UpdateStatusRequest(uuid, status);

        try {
            const baseResponse = await this.useCase.execute(request);
            res.status(baseResponse.statusCode).json(baseResponse);
        } catch (error) {
            console.error(error);
            const baseResponse = new BaseResponse(null, "Internal server error", false, 500);
            res.status(baseResponse.statusCode).json(baseResponse);
        }
    }
}
