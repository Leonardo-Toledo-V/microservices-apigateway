import { Request, Response } from "express";
import { UpdateStatusUseCase } from "../../application/useCases/UpdateStatusUseCase";
import { RabbitMQ } from "../services/RabbitMQ";
import { BaseResponse } from "../../application/dtos/response/BaseResponse";

export class UpdateStatusController {
    constructor(
        readonly useCase: UpdateStatusUseCase,
        readonly mqtt: RabbitMQ
    ) { }

    async run(req: Request, res: Response) {
        try {
            const id = req.params.id
            const { status } = req.body
            if (status !== 'Pagado' && status !== 'Creado' && status !=='Enviado' && status !=='pagado' && status !== 'creado' && status !=='enviado') {
                const baseResponse = new BaseResponse(null, "Invalid status", false, 400);
                return res.status(baseResponse.statusCode).json(baseResponse);
            }
            const order = await this.useCase.run(id, status)
            if (order) {
                if (status == "enviado") {
                    const orderProduct = await this.useCase.runView(id)
                    await this.mqtt.sendToQueue(orderProduct)
                }
                return res.status(201).send({
                    status: "Success",
                    data: order,
                    message: "order status change success"
                })
            }
            return res.status(417).send({
                status: "error",
                data: [],
                message: "order status change fail"
            })
        } catch (e) {
            console.log("request error", e)
            return res.status(400).send({
                message: "error",
                error: e
            })
        }
    }
}