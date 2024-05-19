import {OrderInterface} from "../../domain/port/OrderInterface";

export class UpdateStatusUseCase{
    constructor(readonly repository:OrderInterface) {
    }

    async run(id:string,status:string){
        try {
            return await this.repository.changeStatus(id,status)
        }catch (e) {
            return null
        }
    }

    async runView(orderId:string){
        try {
            return await this.repository.getOrderProducts(orderId)
        }catch (e) {
            return null
        }
    }
}