from bll import ResultBLL
from bll.score_bll import ScoreItemBLL, ScoreTemplateBLL
from helper.app_model_transfer_helper import AppModelTransferHelper
from .handler_base import *


class ScoreBaseHandler(BaseHandler):
    # result_bll = ScoreItemBLL()
    pass

class ScoreItemCRUDHandler(BaseCRUDHandler):
    bll = ScoreItemBLL()
    model_name = 'ScoreItemModel'

class ScoreItemListHandler(BaseListHandler):

    def __init__(self, *args, **kwargs):
        self.get_list_func = ScoreItemBLL().get_list_by_condition
        super().__init__(*args, **kwargs)

class ScoreItemTaskRelationHandler(ScoreBaseHandler):

    def post(self):
        data = self.get_decrypt_request_body_data()
        task_id = data.get('taskId')
        score_item_ids = data.get('scoreItemIds')
        rst = 0
        if task_id is not None and task_id > 0 and score_item_ids is not None and len(score_item_ids) > 0:
            rst = ScoreItemBLL().create_task_score_item_relation(task_id, score_item_ids)
        self.write_decrypt_response(code=rst)


class ScoreTemplateCRUDHandler(BaseCRUDHandler):
    bll = ScoreTemplateBLL()
    model_name = 'ScoreTemplateModel'

class ScoreTemplateListHandler(BaseListHandler):

    def __init__(self, *args, **kwargs):
        self.get_list_func = ScoreTemplateBLL().get_list_by_condition
        super().__init__(*args, **kwargs)
