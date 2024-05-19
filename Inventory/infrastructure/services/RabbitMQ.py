import pika
import json
from Inventory.infrastructure.repositories.mySqlRepository import InventoryRepository

def update_stock(product_id, units):
    repository = InventoryRepository()
    try:
        product = repository.reduce_stock(product_id, units)
        print(f"Stock actualizado para el producto {product_id}: {units} unidades menos")
    except ValueError as e:
        print(f"Error al actualizar el stock: {e}")

def callback(ch, method, properties, body):
    print(" [x] Received %r" % body)
    message = json.loads(body)

    # Procesar el mensaje
    product_id = message['productid']
    units = message['units']

    # Actualizar el stock en la base de datos
    update_stock(product_id, units)

    # Confirmar que el mensaje ha sido procesado
    ch.basic_ack(delivery_tag=method.delivery_tag)

def start():
    # Configurar la conexión a RabbitMQ
    rabbitmq_url = 'amqp://admin:adminadmin@localhost:5672/'
    params = pika.URLParameters(rabbitmq_url)
    connection = pika.BlockingConnection(params)
    channel = connection.channel()

    queue = 'ordenes_enviadas'

    # Asegurarse de que la cola existe
    channel.queue_declare(queue=queue, durable=True)

    # Configurar el consumidor
    channel.basic_consume(queue=queue, on_message_callback=callback)

    print(' [*] Waiting for messages. To exit press CTRL+C')
    channel.start_consuming()