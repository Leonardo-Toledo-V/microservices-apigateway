import dotenv from "dotenv";
import amqp from 'amqplib';
import * as process from "process";

dotenv.config();

export class RabbitMQ {

    async sendToQueue(message: any) {
        try {
            const RABBITMQ_URL = process.env.RABBITMQ;
            if (RABBITMQ_URL !== undefined) {
                const connection = await amqp.connect(RABBITMQ_URL);
                const channel = await connection.createChannel();
                const queue = 'ordenes_enviadas';

                await channel.assertQueue(queue, { durable: true });
                channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), { persistent: true });

                console.log('Mensaje enviado a la cola:', message);
                await channel.close();
                await connection.close();
            } else {
                throw new Error("RABBITMQ_URL no está definido en el archivo .env");
            }
        } catch (e) {
            console.error("Error en RabbitMQ:\n", e);
        }
    }
}