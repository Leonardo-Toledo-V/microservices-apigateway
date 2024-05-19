
export class OrderProduct {
    constructor(
        readonly orderid: string,
        readonly productid: string,
        readonly units: number,
        readonly price: number,
        readonly deleted_at: Date | null

    ) {
    }
}