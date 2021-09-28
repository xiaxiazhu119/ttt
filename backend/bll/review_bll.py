
from bll.base_bll import BaseBLL
from dal import ReviewDAL


class ReviewBLL(BaseBLL):

    def __init__(self):
        self.dal = ReviewDAL()
        super().__init__()
        
    def get_list_by_condition(self, sc):
        return self.dal.get_list_by_condition(sc)
        