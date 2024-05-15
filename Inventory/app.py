from flask import Flask
from infrastructure.routes.router import initialize_routes
from infrastructure.repositories.mySqlRepository import InventoryRepository

app = Flask(__name__)
inventory_repository= InventoryRepository()

initialize_routes(app, inventory_repository)

if __name__ == '__main__':
    app.run(debug=True, port='3001')