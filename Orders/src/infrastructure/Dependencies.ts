import { MysqlOrderRepository } from "./repositories/MysqlRepository";
import { UpdateStatusUseCase } from "../application/useCases/UpdateStatusUseCase";
import { UpdateStatusController } from "./controllers/UpdateStatusController";
import { CreateOrderUseCase } from "../application/useCases/CreateOrderUseCase";
import { CreateOrderController } from "./controllers/CreateOrderController";
import { ListOrderUseCase } from "../application/useCases/ListOrderUseCase";
import { ListOrderController } from "./controllers/ListOrderController";
import { RabbitMQ } from "./services/RabbitMQ";

export const database = new MysqlOrderRepository()

export const updateStatusUseCase = new UpdateStatusUseCase(database)
export const rabbitMQ = new RabbitMQ()
export const updateStatusController = new UpdateStatusController(updateStatusUseCase, rabbitMQ)

export const createOrderUseCase = new CreateOrderUseCase(database)
export const createOrderController = new CreateOrderController(createOrderUseCase)


export const listOrderUseCase = new ListOrderUseCase(database)
export const listOrderController = new ListOrderController(listOrderUseCase)