from bll import SysBLL
from helper.app_model_transfer_helper import AppModelTransferHelper
from models import SysModel
from .handler_base import *


class SysBaseHandler(BaseHandler):
    sys_bll = SysBLL()

# class SysDictHandler(SysBaseHandler):

#     def get(self, id):
#         sys = self.sys_bll.read(id)
#         self.write_decrypt_response(data=sys)
    
#     def post(self, id):
#         data = self.get_decrypt_request_body_data()
#         sys = AppModelTransferHelper('SysModel').auto_transfer(data)
#         # print(id,data, sys, sys.type, sys.name)
#         func = None
#         if int(id) == 0:
#             func = self.sys_bll.create
#         else:
#             func = self.sys_bll.update
#         rst = func(sys)
#         self.write_decrypt_response(code=rst)

#     def delete(self, id):
#         cnt = self.sys_bll.delete(id)
#         self.write_decrypt_response(code=cnt)

class SysCRUDHandler(BaseCRUDHandler):
    bll = SysBLL()
    model_name = 'SysModel'

class SysListHandler(BaseListHandler):
  
    def __init__(self, *args, **kwargs):
        self.get_list_func = SysBLL().get_list_by_condition
        super().__init__(*args, **kwargs)

    # def get(self):
    #     def query(sc):
    #         return self.sys_bll.get_list_by_condition(sc)
    #     self.write_sc_list_response(query)
    