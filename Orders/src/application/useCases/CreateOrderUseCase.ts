import { OrderInterface } from "../../domain/port/OrderInterface";

export class CreateOrderUseCase {
    constructor(readonly repository: OrderInterface) {
    }

    async run(
        productId: string,
        units: number,
        total: number,
        date: Date,
        status: string,
    ) {
        try {
            return await this.repository.create(productId, units, total, date, status)
        } catch (e) {
            return null;
        }
    }
}