from database.mysql import DBConnection, Base
from sqlalchemy import Column, Integer, String, Float
from domain.models.Products import Products
from domain.port.ProductsInterface import ProductsInterface

class Inventory(Base):
    __tablename__ = 'inventory'

    id = Column(Integer, primary_key=True)
    name = Column(String(255))
    price = Column(Float)
    stock = Column(Integer)
    
    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "price": self.price,
            "stock": self.stock
        }
    
class InventoryRepository(ProductsInterface):
    def __init__(self):
        self.session = DBConnection().get_session()
    
    def get_products(self):
        products = self.session.query(Inventory).all()
        return products
        
    def add_product(self, product: Products):
        product = Inventory(name=product.name, price=product.price, stock=product.stock)
        self.session.add(product)
        self.session.commit()
        return product
    
    def remove_product(self, product_id):
        product = self.get_id_product(product_id)
        if product:
            self.session.delete(product)
            self.session.commit()
        return product

    def get_id_product(self, product_id):
        print("****",product_id)
        if isinstance(product_id, Inventory):
            product_id = product_id.id
        return self.session.query(Inventory).filter(Inventory.id == product_id).first()