from bll import ReviewBLL
from helper.app_model_transfer_helper import AppModelTransferHelper
from .handler_base import *


class ReviewBaseHandler(BaseHandler):
    review_bll = ReviewBLL()
    pass

class ReviewCRUDHandler(BaseCRUDHandler):
    bll = ReviewBLL()
    model_name = 'ReviewModel'

class ReviewListHandler(BaseListHandler):

    def __init__(self, *args, **kwargs):
        self.get_list_func = ReviewBLL().get_list_by_condition
        super().__init__(*args, **kwargs)

# class ReviewStatisticsHandler(BaseListHandler):

#     def __init__(self, *args, **kwargs):
#         self.get_list_func = ReviewBLL().get_list_by_condition
#         super().__init__(*args, **kwargs)

