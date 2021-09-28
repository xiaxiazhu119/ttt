
from bll.base_bll import BaseBLL
from dal import UserGroupDAL


class UserGroupBLL(BaseBLL):

    def __init__(self):
        self.dal = UserGroupDAL()
        super().__init__()
        
    def get_exclude(self, id):
        return self.dal.get_exclude(id)

    def create_relation(self, group_id, user_ids):
        return self.dal.create_relation(group_id, user_ids)

    def get_relation_users(self, group_id):
        return self.dal.get_relation_users(group_id)
        
    def delete_relation(self, group_id, users):
        return self.dal.delete_relation(group_id, users)

    def switch_group_leader(self, group_id, user_id, is_leader):
        return self.dal.switch_group_leader(group_id, user_id, is_leader)
        
