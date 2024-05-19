import { Order } from "../../domain/models/Order";
import { query } from "../../database/mysql";
import { OrderInterface } from "../../domain/port/OrderInterface";
import { OrderProduct } from "../../domain/models/OrderProduct";
import { v4 as uuidv4 } from 'uuid';


export class MysqlOrderRepository implements OrderInterface {


    async getOrder(id: string) {
        const sql = "SELECT * FROM Orders WHERE id = ? AND deleted_at IS NULL"
        const params: any[] = [id]
        try {
            const [result]: any = await query(sql, params)
            const order = result[0]
            return new Order(order.id, order.total, order.date, order.status, order.deleted_at)
        } catch (e) {
            console.log(e)
            return null;
        }
    }

    async create(productId: string, units: number, total: number, date: Date, status: string): Promise<Order | null> {
        const id = uuidv4()
        if (id != undefined) {
            const sql = "INSERT INTO Orders(id,total,date,status) VALUES(?,?,?,?)"
            const params: any[] = [id, total, date, status]
            try {
                const [result]: any = await query(sql, params)
                if (result) {
                    const sql = "INSERT INTO Orders_Products(order_id,product_id,units,price) VALUES (?,?,?,?)"
                    const params: any[] = [id, productId, units, total]
                    const [result]: any = await query(sql, params)
                    return this.getOrder(id)
                }
            } catch (e) {
                console.log("repository error\n", e)
                return null
            }
        }
        return null
    }
    async changeStatus(id: string, status: string): Promise<Order | null> {
        const sql = "UPDATE Orders SET status = ? WHERE id=? AND deleted_at IS NULL"
        const params: any[] = [status, id]
        try {
            const [result]: any = await query(sql, params)
            if (result) {
                return await this.getOrder(id)
            }
            return null;
        } catch (e) {
            console.log("repository error:\n", e)
            return null;
        }
    }
    async getAll(): Promise<Order[] | null> {
        const sql = "SELECT * FROM Orders WHERE deleted_at IS NULL"
        try {
            const [result]: any = await query(sql, [])
            return result.map((orderData: any) =>
                new Order(
                    orderData.id,
                    orderData.total,
                    orderData.date,
                    orderData.status,
                    orderData.deleted_at
                )
            )
        } catch (e) {
            console.log("repository error:\n", e)
            return null;
        }

    }

    async getOrderProducts(orderId: string): Promise<OrderProduct[] | null> {
        try {
            const sql = "SELECT * FROM Orders_Products WHERE order_id=? AND deleted_at IS NULL"
            const params: any[] = [orderId]
            const [results]: any = await query(sql, params)
            if (results) {
                return results.map((result: any) =>
                    new OrderProduct(orderId, result.product_id, result.units, result.price, null)
                );
            } else {
                return null;
            }
        } catch (e) {
            console.log("repository error:\n", e)
            return null;
        }
    }

}