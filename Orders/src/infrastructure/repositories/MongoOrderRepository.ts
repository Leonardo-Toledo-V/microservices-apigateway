import { Collection } from "mongodb";
import { OrderInterface } from "../../domain/port/OrderInterface";
import { Order } from "../../domain/models/Order";
import { connect } from "../../database/mongo";




export class MongoOrderRepository implements OrderInterface {
    private collection!: Collection | any;

    constructor() {
        this.initializeCollection();
    }

    async create(order: Order): Promise<Order | null> {
        try {
            this.collection.insertOne(order);
            return Promise.resolve(order);
        } catch (error) {
            console.log(error);
            return Promise.resolve(null);
        }
    }

    async list(): Promise<Order[] | null> {
        try {
            const result = await this.collection.find().toArray();
            if (result) {
                return result.map((element: any) => {
                    let order = new Order(element.total, element.status);
                    order.uuid = element.uuid;
                    return order;
                });
            }
            return Promise.resolve(null);
        } catch (error) {
            return Promise.resolve(null);
        }
    }

    async updateStatus(uuid: string, status: string): Promise<Order | null> {
        try {
            const result = await this.collection.findOneAndUpdate({ uuid: uuid }, { $set: { status: status } }, { returnDocument: "after" });
            if (result) {
                let order = new Order(result.total, result.status);
                order.uuid = result.uuid;
                return Promise.resolve(order);
            }
            return Promise.resolve(null);
        } catch (error) {
            return Promise.resolve(null);
        }
    }

    private async initializeCollection(): Promise<void> {
        this.collection = await connect("order");
    }
}