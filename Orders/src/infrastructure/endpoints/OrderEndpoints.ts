import { Express } from "express";
import { createOrderController, listOrderController, updateStatusController } from "../Dependencies";

export function setupOrderEndpoints(app: Express) {
    app.get(`/health`, (req, res) => {
        res.status(200).json({ status: 'OK' });
    });
    app.post(`/`, createOrderController.execute.bind(createOrderController));
    app.put(`/:uuid`, updateStatusController.execute.bind(updateStatusController));
    app.get(`/`, listOrderController.execute.bind(listOrderController));
}