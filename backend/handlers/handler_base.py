from x_py_libs.extensions.base_handler_tornado import *

from helper.app_model_transfer_helper import AppModelTransferHelper
from .handler_base import *



class BaseHandler(BaseTornadoHandler):

    def __init__(self, *args, **kwargs):
        self.ignore_sign_in_authorization = True
        self.decryptSC = False
        super().__init__(*args, **kwargs)

class BaseListHandler(BaseHandler):
    
    get_list_func = None

    def get(self):
        def query(sc):
            return self.get_list_func(sc)
        self.write_sc_list_response(query)

class BaseCRUDHandler(BaseHandler):

    bll = None
    model_name = None

    ext_for_get = []
  
    def get(self, id=None):
        if id is None or id == 0:
          self.write_decrypt_response(code=0)
          return
        data = self.bll.read(id)
        
        if len(self.ext_for_get) > 0:
            for kvp in self.ext_for_get:
                key = kvp.get('key')
                value = kvp.get('value')
                data[key] = value
                
        self.write_decrypt_response(data=data)
    
    def post(self, id):
        data = self.get_decrypt_request_body_data()
        obj = AppModelTransferHelper(self.model_name).auto_transfer(data)
        # print(id,data, org, org.type, org.name)
        # print('transfer obj:', obj)
        func = None
        rst = 0
        if int(id) == 0:
            func = self.bll.create
        else:
            func = self.bll.update
        rst = func(obj)
        self.write_decrypt_response(code=rst)

    def delete(self, id):
        cnt = self.bll.delete(id)
        self.write_decrypt_response(code=cnt)