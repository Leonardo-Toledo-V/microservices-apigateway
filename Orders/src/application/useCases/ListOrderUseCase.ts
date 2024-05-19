import { OrderInterface } from "../../domain/port/OrderInterface";

export class ListOrderUseCase {
    constructor(readonly repository: OrderInterface) {
    }

    async run() {
        try {
            return await this.repository.getAll()
        } catch (e) {
            return null;
        }
    }
}