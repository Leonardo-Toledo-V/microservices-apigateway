class GetInventoryUseCase:
    def __init__(self, inventory_repo):
        self.inventory_repo = inventory_repo

    def get_inventory(self):
        return self.inventory_repo.get_products()