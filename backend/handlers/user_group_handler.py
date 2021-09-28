from x_py_libs.helpers.crypto_helper import CryptoHelper
from bll.user_group_bll import UserGroupBLL
from helper.app_model_transfer_helper import AppModelTransferHelper
from .handler_base import BaseHandler, BaseListHandler


class UserGroupBaseHandler(BaseHandler):
    group_bll = UserGroupBLL()
             
class UserGroupCRUDHandler(UserGroupBaseHandler):

    def get(self, id):
        group = self.group_bll.read(id)
        users, cnt = self.group_bll.get_relation_users(id)
        data = {
            'group': group,
            'users': users
        }
        self.write_decrypt_response(data=data)
    
    def post(self, id):
        data = self.get_decrypt_request_body_data()
        # print(data)
        group = AppModelTransferHelper('UserGroupModel').auto_transfer(data)
                
        rst = 0
        func = None
        if int(id) == 0:
            func = self.group_bll.create
        else:
            func = self.group_bll.update
        rst = func(group)
        self.write_decrypt_response(code=rst)

    def delete(self, id):
        cnt = self.group_bll.delete(id)
        self.write_decrypt_response(code=cnt)
    
        
class UserGroupListHandler(BaseListHandler):

    def __init__(self, *args, **kwargs):
        self.get_list_func = UserGroupBLL().get_list_by_condition
        super().__init__(*args, **kwargs)

class UserGroupRelationCRUDHandler(UserGroupBaseHandler):

    def get(self, group_id):
        users, cnt = self.group_bll.get_relation_users(group_id)
        self.write_decrypt_response(data=users)
    
    def post(self, group_id):
        data = self.get_decrypt_request_body_data()
        # print(data)
        user_ids = data.get('user_ids')
        rst = self.group_bll.create_relation(group_id, user_ids)
        self.write_decrypt_response(code=rst)

    def delete(self, group_id, user_id, users=None):
        if users is not None and users != '':
            users = CryptoHelper.decrypt_by_aes(users).split(',')
            if len(users) == 0:
                self.write_decrypt_response(code=0)
        else:
            users = [user_id]

        # print(group_id, user_id, users)
        rst = self.group_bll.delete_relation(group_id, users)
        # rst = 0
        self.write_decrypt_response(code=rst)

class UserGroupRelationAuthorHandler(UserGroupBaseHandler):
    
    def post(self, group_id, user_id, is_leader):
        # print(group_id, user_id, is_leader)
        rst = self.group_bll.switch_group_leader(group_id, user_id, is_leader)
        self.write_decrypt_response(code=rst)


class UserGroupRelationExcludeHandler(UserGroupBaseHandler):

    def get(self, group_id):
        # data = self.get_decrypt_request_query_argument()
        # users = data.get('users')
        # print(id, data)
        rst = self.group_bll.get_exclude(group_id)
        self.write_decrypt_response(data=rst)

        # group = AppModelTransferHelper('UserGroupModel').auto_transfer(data)
                
        # rst = 0
        # func = None
        # if int(id) == 0:
        #     func = self.group_bll.create
        # else:
        #     func = self.group_bll.update
        # rst = func(group)
        # self.write_decrypt_response(code=rst)