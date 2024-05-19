import dotenv from "dotenv";
import amqp from 'amqplib';
import * as process from "process";

dotenv.config();

export class RabbitMQ {

    async sendToQueue(message: any) {
        try {
            const RABBITMQ_URL_VARIABLE = process.env.RABBITMQ_URL;
            if (RABBITMQ_URL_VARIABLE !== undefined) {
                const connection = await amqp.connect(RABBITMQ_URL_VARIABLE);
                const channel = await connection.createChannel();
                const queue = 'orders_coliflor';

                await channel.assertQueue(queue, { durable: true });
                channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)), { persistent: true });

                console.log('Mensaje enviado a la coliflor:', message);
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