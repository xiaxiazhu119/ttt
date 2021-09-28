from x_py_libs.helpers.crypto_helper import CryptoHelper
from bll.user_bll import UserBLL
from helper.app_model_transfer_helper import AppModelTransferHelper
from .handler_base import BaseHandler, BaseListHandler


class UserBaseHandler(BaseHandler):
    user_bll = UserBLL()
    
class UserSignInHandler(UserBaseHandler):

    def post(self):
        data = self.get_decrypt_request_body_data()
        up = data.get('up')
        up = AppModelTransferHelper('UserPassportModel').auto_transfer(up)
        encrypted_captcha = CryptoHelper.encrypt_by_md5(CryptoHelper.encrypt_by_aes(up.captcha)).upper()
        if encrypted_captcha != up.captcha_chars:
            self.write_decrypt_response()
            return;

        user = self.user_bll.sign_in(up)
        self.write_decrypt_response(data=user)

class UserSignUpHandler(UserBaseHandler):
  
    def post(self):
        data = self.get_decrypt_request_body_data()
        up = data.get('up')
        up = AppModelTransferHelper('UserPassportModel').auto_transfer(up)
        encrypted_captcha = CryptoHelper.encrypt_by_md5(CryptoHelper.encrypt_by_aes(up.captcha)).upper()
        if encrypted_captcha != up.captcha_chars:
            self.write_decrypt_response()
            return;

        id = self.user_bll.sign_up(up)
        self.write_decrypt_response(data=id)

class UserCRUDHandler(UserBaseHandler):

    def get(self, id):
        user_view, fields, finances = self.user_bll.read_view(id)
        data = {
            'user': user_view,
            'fields': fields,
            'finances': finances
        }
        self.write_decrypt_response(data=data)
    
    def post(self, id):
        data = self.get_decrypt_request_body_data()
        up = data.get('up')
        p = data.get('p')
        up = AppModelTransferHelper('UserPassportModel').auto_transfer(up)
        if p is not None:
            p = AppModelTransferHelper('UserProfileModel').auto_transfer(p)
            # print(p.finances)
            if p.finances is not None and len(p.finances) > 0:
                p.finances = list(map(lambda f:AppModelTransferHelper('UserFinanceModel').auto_transfer(f), p.finances))
                
        rst = 0
        func = None
        if int(id) == 0:
            func = self.user_bll.create
        else:
            func = self.user_bll.update
        user = {
            'up': up,
            'p': p
        }
        rst = func(user)
        self.write_decrypt_response(code=rst)

    def delete(self, id):
        cnt = self.user_bll.delete(id)
        self.write_decrypt_response(code=cnt)

# class UserListHandler(UserBaseHandler):

#     def get(self):
#         def query(sc):
#             return self.user_bll.get_list_by_condition(sc)
#         self.write_sc_list_response(query)
    
        
class UserListHandler(BaseListHandler):

    def __init__(self, *args, **kwargs):
        self.get_list_func = UserBLL().get_list_by_condition
        super().__init__(*args, **kwargs)

class UserFinanceHandler(UserBaseHandler):

    def delete(self, id):
        rst = self.user_bll.delete_finance(id)
        self.write_decrypt_response(code=rst)
         
class UserGroupCRUDHandler(UserBaseHandler):

    def get(self, id):
        # user_view, fields, finances = self.user_bll.read_view(id)
        # data = {
        #     'user': user_view,
        #     'fields': fields,
        #     'finances': finances
        # }
        # self.write_decrypt_response(data=data);
        pass
    
    def post(self, id):
        # data = self.get_decrypt_request_body_data()
        # up = data.get('up')
        # p = data.get('p')
        # up = AppModelTransferHelper('UserPassportModel').auto_transfer(up)
        # if p is not None:
        #     p = AppModelTransferHelper('UserProfileModel').auto_transfer(p)
        #     # print(p.finances)
        #     if p.finances is not None and len(p.finances) > 0:
        #         p.finances = list(map(lambda f:AppModelTransferHelper('UserFinanceModel').auto_transfer(f), p.finances))
                
        # rst = 0
        # func = None
        # if int(id) == 0:
        #     func = self.user_bll.create
        # else:
        #     func = self.user_bll.update
        # user = {
        #     'up': up,
        #     'p': p
        # }
        # rst = func(user)
        # self.write_decrypt_response(code=rst);
        pass

    def delete(self, id):
        # cnt = self.user_bll.delete(id)
        # self.write_decrypt_response(code=cnt);
        pass
    
        
class UserGroupListHandler(BaseListHandler):

    def __init__(self, *args, **kwargs):
        super().__init__()