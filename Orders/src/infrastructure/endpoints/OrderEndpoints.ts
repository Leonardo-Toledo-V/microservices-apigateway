import express from "express";
import { listOrderController, createOrderController, updateStatusController } from "../Dependencies";

export const setupOrderEndpoints = express.Router()

setupOrderEndpoints.get("/", listOrderController.run.bind(listOrderController))
setupOrderEndpoints.post("/", createOrderController.run.bind(createOrderController))
setupOrderEndpoints.put("/:id", updateStatusController.run.bind(updateStatusController))