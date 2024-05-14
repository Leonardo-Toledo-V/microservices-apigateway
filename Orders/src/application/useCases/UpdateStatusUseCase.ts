import { UpdateStatusRequest } from '../dtos/request/UpdateStatusRequest';
import { BaseResponse } from '../dtos/response/BaseResponse';
import { OrderInterface } from '../../domain/port/OrderInterface';

export class UpdateStatusUseCase {
    constructor(readonly repository: OrderInterface) { }

    async execute(request: UpdateStatusRequest): Promise<BaseResponse> {
        try {
            const updatedOrder = await this.repository.updateStatus(request.orderId, request.newStatus);
            if (updatedOrder) {
                return new BaseResponse(updatedOrder, "Order status updated successfully", true, 200);
            } else {
                return new BaseResponse(null, "Order status update failed. Order not found or invalid status.", false, 404);
            }
        } catch (error) {
            console.error("Error updating order status:", error);
            return new BaseResponse(null, "An error occurred while updating order status", false, 500);
        }
    }
}
