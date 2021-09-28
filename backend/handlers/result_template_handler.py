from bll import ResultTemplateBLL
from helper.app_model_transfer_helper import AppModelTransferHelper
from models import ResultTemplateModel
from .handler_base import *


class ResultTemplateBaseHandler(BaseHandler):
    # result_bll = ResultTemplateBLL()
    pass

class ResultTemplateCRUDHandler(BaseCRUDHandler):
    bll = ResultTemplateBLL()
    model_name = 'ResultTemplateModel'
          
class ResultTemplateListHandler(BaseListHandler):

    def __init__(self, *args, **kwargs):
        self.get_list_func = ResultTemplateBLL().get_list_by_condition
        super().__init__(*args, **kwargs)

