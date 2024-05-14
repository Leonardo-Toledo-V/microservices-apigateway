import { OrderInterface } from "../../domain/port/OrderInterface";
import { BaseResponse } from "../dtos/response/BaseResponse";
import { OrderResponse } from "../dtos/response/OrderResponse";



export class ListOrderUseCase {
    constructor(readonly repository: OrderInterface) { }

    async execute(): Promise<BaseResponse> {
        let result = await this.repository.list();
        if (result) {
            let response = result.map(order => new OrderResponse(order.uuid, order.total, order.date, order.status));
            return new BaseResponse(response, "Order listed", true, 200);
        } else {
            return new BaseResponse(null, "Order not listed", false, 400);
        }
    }
}