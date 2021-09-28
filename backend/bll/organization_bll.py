
from bll.base_bll import BaseBLL
from dal import OrganizationDAL
from enums.app_enum import StatusEnum


class OrganizationBLL(BaseBLL):

    def __init__(self):
        self.dal = OrganizationDAL()
        super().__init__()
        
    # def create(self, org):
    #     return self.dal.create(org);

    # def read(self, id):
    #     return self.dal.read(id);

    # def update(self, org):
    #     return self.dal.update(org);

    # def delete(self, id):
    #     return self.dal.delete(id);

    # def get_list_by_condition(self, sc):
    #     return self.dal.get_list_by_condition(sc);

    def get_simple_enabled_list(self, sc=None):
        return self.dal.get_simple_enabled_list();
        
