import { Order } from '../models/Order';

export interface OrderInterface {
    create(order: Order): Promise<Order | null>;
    list(): Promise<Order[] | null>;
    updateStatus(uuid: string, status: string): Promise<Order | null>;
}