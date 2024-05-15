from flask import Blueprint
from application.useCases.GetInventoryUseCase import GetInventoryUseCase

get_inventory_blueprint = Blueprint('get_inventory', __name__)

def initialize_endpoints(inventory_repository):
    get_inventory_use_case = GetInventoryUseCase(inventory_repository)
    
    @get_inventory_blueprint.route('/', methods=['GET'])
    def get_inventory():
        products = get_inventory_use_case.get_inventory()
        products = [product.to_dict() for product in products]
        return products, 200