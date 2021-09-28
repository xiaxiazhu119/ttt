from bll import TaskBLL
from bll.score_bll import ScoreItemBLL
from helper.app_model_transfer_helper import AppModelTransferHelper
from models import TaskModel
from .handler_base import *


class TaskBaseHandler(BaseHandler):
    task_bll = TaskBLL()

class TaskCRUDHandler(BaseCRUDHandler):
    bll = TaskBLL()
    model_name = 'TaskModel'
  
    def get(self, id=None):
        ext_for_get = []
        group_relation = self.bll.get_task_group_relation(id)
        if len(group_relation) > 0:
            ext_for_get.append({
                'key': 'groups',
                'value': group_relation
            })
        
        score_item_relation = ScoreItemBLL().get_task_score_item_relation(id)
        if len(score_item_relation) > 0:
            ext_for_get.append({
                'key': 'scoreItems',
                'value': score_item_relation
            })
        
        result_template_relation = self.bll.get_task_result_template_relation(id)
        if result_template_relation is not None:
            ext_for_get.append({
                'key': 'rt',
                'value': result_template_relation
            })
        
        if len(ext_for_get) > 0:
            self.ext_for_get = ext_for_get
        super().get(id)
  
    # def get(self, id):
    #     task = self.task_bll.read(id)
    #     self.write_decrypt_response(data=task);
    
    # def post(self, id):
    #     data = self.get_decrypt_request_body_data()
    #     task = AppModelTransferHelper('TaskModel').auto_transfer(data)
    #     # print(id,data, org, org.type, org.name)
    #     func = None
    #     if int(id) == 0:
    #         func = self.task_bll.create
    #     else:
    #         func = self.task_bll.update
    #     rst = func(task)
    #     self.write_decrypt_response(code=rst);

    # def delete(self, id):
    #     cnt = self.task_bll.delete(id)
    #     self.write_decrypt_response(code=cnt);
        
class TaskListHandler(BaseListHandler):

    def __init__(self, *args, **kwargs):
        self.get_list_func = TaskBLL().get_list_by_condition
        super().__init__(*args, **kwargs)
