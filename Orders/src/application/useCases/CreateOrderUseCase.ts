import { CreateOrderRequest } from '../dtos/request/CreateOrderRequest';
import { BaseResponse } from '../dtos/response/BaseResponse';
import { OrderInterface } from '../../domain/port/OrderInterface';
import { Order } from '../../domain/models/Order';
import { OrderResponse } from '../dtos/response/OrderResponse';

export class CreateOrderUseCase {
    constructor(readonly repository: OrderInterface) { }
    async execute(request: CreateOrderRequest): Promise<BaseResponse> {
        let order = new Order(request.total, request.status);
        console.log(order);
        let result = await this.repository.create(order);
        console.log(result);
        if (result) {
            let response = new OrderResponse(result.uuid, result.total, result.date, result.status);
            return new BaseResponse(response, "Order created", true, 201);
        } else {
            return new BaseResponse(null, "Order not created", false, 400);
        }
    }
}