
from bll.base_bll import BaseBLL
from dal import SysDAL


class SysBLL(BaseBLL):

    def __init__(self):
        self.dal = SysDAL()
        super().__init__()
        
    # def create(self, sys):
    #     return self.dal.create(sys);

    # def read(self, id):
    #     return self.dal.read(id);

    # def update(self, sys):
    #     return self.dal.update(sys);

    # def delete(self, id):
    #     return self.dal.delete(id);

    # def get_list_by_condition(self, sc):
    #     return self.dal.get_list_by_condition(sc);

        
