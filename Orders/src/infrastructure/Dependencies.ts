import { MongoOrderRepository } from './repositories/MongoOrderRepository';
import { CreateOrderUseCase } from '../application/useCases/CreateOrderUseCase';
import { ListOrderUseCase } from '../application/useCases/ListOrderUseCase';
import { UpdateStatusUseCase } from '../application/useCases/UpdateStatusUseCase';

import { CreateOrderController } from './controllers/CreateOrderController';
import { ListOrderController } from './controllers/ListOrderController';
import { UpdateStatusController } from './controllers/UpdateStatusController';



export const database = new MongoOrderRepository();

export const createOrderUseCase = new CreateOrderUseCase(database);
export const listOrderUseCase = new ListOrderUseCase(database);
export const updateStatusUseCase = new UpdateStatusUseCase(database);

export const createOrderController = new CreateOrderController(createOrderUseCase);
export const listOrderController = new ListOrderController(listOrderUseCase);
export const updateStatusController = new UpdateStatusController(updateStatusUseCase);