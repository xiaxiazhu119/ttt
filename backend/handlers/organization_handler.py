from bll import OrganizationBLL
from helper.app_model_transfer_helper import AppModelTransferHelper
from models import OrganizationModel
from .handler_base import *


class OrganizationBaseHandler(BaseHandler):
    org_bll = OrganizationBLL()

# class OrganizationCRUDHandler(OrganizationBaseHandler):

#     def get(self, id):
#         org = self.org_bll.read(id)
#         self.write_decrypt_response(data=org)
    
#     def post(self, id):
#         data = self.get_decrypt_request_body_data()
#         org = AppModelTransferHelper('OrganizationModel').auto_transfer(data)
#         # print(id,data, org, org.type, org.name)
#         func = None
#         if int(id) == 0:
#             func = self.org_bll.create
#         else:
#             func = self.org_bll.update
#         rst = func(org)
#         self.write_decrypt_response(code=rst)

#     def delete(self, id):
#         cnt = self.org_bll.delete(id)
#         self.write_decrypt_response(code=cnt)

class OrganizationCRUDHandler(BaseCRUDHandler):
    bll = OrganizationBLL()
    model_name = 'OrganizationModel'
        
class OrganizationListHandler(BaseListHandler):

    def __init__(self, *args, **kwargs):
        self.get_list_func = OrganizationBLL().get_list_by_condition
        super().__init__(*args, **kwargs)

    # def get(self):
    #     def query(sc):
    #         return self.org_bll.get_list_by_condition(sc)
    #     self.write_sc_list_response(query)
    
class OrganizationSimpleListHandler(BaseListHandler):
  
    def __init__(self, *args, **kwargs):
        self.get_list_func = OrganizationBLL().get_simple_enabled_list
        super().__init__(*args, **kwargs)
    # def get(self):
    #     def query(sc):
    #         return self.org_bll.get_simple_enabled_list()
    #     self.write_sc_list_response(query)
