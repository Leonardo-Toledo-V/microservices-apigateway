import { Request, Response } from 'express';
import { BaseResponse } from '../../application/dtos/response/BaseResponse';
import { CreateOrderUseCase } from '../../application/useCases/CreateOrderUseCase';
import { CreateOrderRequest } from '../../application/dtos/request/CreateOrderRequest';

export class CreateOrderController{
    constructor(readonly useCase: CreateOrderUseCase){}

    async execute(req: Request, res: Response){
        const data = req.body;
        console.log(data);
        if(data.status !== 'paid' && 'created' && 'sent'){
            let baseResponse = new BaseResponse("Error", "Invalid status", false, 400);
            return res.status(baseResponse.statusCode).json(baseResponse);
        }
        const request = new CreateOrderRequest(parseFloat(data.total), data.status);
        try{
            const baseResponse = await this.useCase.execute(request);
            res.status(baseResponse.statusCode).json(baseResponse);
        }catch(error){
            console.log(error);
            let baseResponse = new BaseResponse("Error", "Internal server error", false, 500);
            res.status(baseResponse.statusCode).json(baseResponse);
        }
    }
}