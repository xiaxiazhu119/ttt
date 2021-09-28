from bll import ResultBLL
from helper.app_model_transfer_helper import AppModelTransferHelper
from models import ResultModel
from .handler_base import *


class ResultBaseHandler(BaseHandler):
    result_bll = ResultBLL()

class ResultCRUDHandler(BaseCRUDHandler):
    bll = ResultBLL()
    model_name = 'ResultModel'
          
class ResultListHandler(BaseListHandler):

    def __init__(self, *args, **kwargs):
        self.get_list_func = ResultBLL().get_list_by_condition
        super().__init__(*args, **kwargs)

class ResultCheckSubmittedHandler(ResultBaseHandler):
    
    def get(self, user_id):
        data = self.result_bll.check_submitted_by_user_id(user_id)
        self.write_decrypt_response(data=data)

class ResultCheckReviewedHandler(ResultBaseHandler):
    
    def get(self, user_id):
        result_ids = self.get_request_query_argument('rids')
        if result_ids is not None and result_ids != '':
            result_ids = result_ids.split(',')
        data = self.result_bll.check_reviewed_by_user_id(user_id, result_ids)
        self.write_decrypt_response(data=data)
