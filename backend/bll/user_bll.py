
from bll.base_bll import BaseBLL
from dal.user_dal import UserDAL


class UserBLL(BaseBLL):

    def __init__(self):
        self.dal = UserDAL()
        super().__init__()

    def sign_in(self, up):
        return self.dal.sign_in(up);

    def sign_up(self, up):
        return self.dal.sign_up(up);

    def read_view(self, user_id):
        return self.dal.read_view(user_id);

    def delete_finance(self, id):
        return self.dal.delete_finance(id)

    # def create(self, up, profile):
    #     return self.dal.create(up, profile)

    # def update(self, up, profile):
    #     return self.dal.update(up, profile)

    # def get_list_by_condition(self, sc):
    #     return self.dal.get_list_by_condition(sc);
        
