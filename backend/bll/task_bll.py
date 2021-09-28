
from bll.base_bll import BaseBLL
from dal import TaskDAL
from enums.app_enum import StatusEnum


class TaskBLL(BaseBLL):

    def __init__(self):
        self.dal = TaskDAL()
        super().__init__()

    def get_task_group_relation(self, task_id):
        return self.dal.get_task_group_relation(task_id)

    def get_task_result_template_relation(self, task_id):
        return self.dal.get_task_result_template_relation(task_id)

        
