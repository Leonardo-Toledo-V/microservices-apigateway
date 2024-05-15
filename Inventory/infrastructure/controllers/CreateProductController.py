from flask import Blueprint, request, jsonify
from application.useCases.CreateProductUseCase import CreateProductUseCase
from domain.models.Products import Products

create_product_blueprint = Blueprint('create_product', __name__)

def initialize_endpoints( product_repository):
    create_product_use_case = CreateProductUseCase(product_repository)
    
    @create_product_blueprint.route('/', methods=['POST'])
    def create_product():
        data = request.get_json()
        product = Products(name=data['name'], price=data['price'], stock=data['stock'])
        product = create_product_use_case.execute(product)
        return jsonify(product.to_dict()), 201