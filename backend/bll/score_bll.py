
from bll.base_bll import BaseBLL
from dal import ScoreItemDAL, ScoreTemplateDAL


class ScoreItemBLL(BaseBLL):

    def __init__(self):
        self.dal = ScoreItemDAL()
        super().__init__()
    
    def create_task_score_item_relation(self, task_id, score_ids):
        return self.dal.create_task_score_item_relation(task_id, score_ids)
    
    def get_task_score_item_relation(self, task_id):
        return self.dal.get_task_score_item_relation(task_id)
        

class ScoreTemplateBLL(BaseBLL):

    def __init__(self):
        self.dal = ScoreTemplateDAL()
        super().__init__()
        
    # def create(self, sys):
    #     return self.dal.create(sys);

    # def read(self, id):
    #     return self.dal.read(id);

    # def update(self, sys):
    #     return self.dal.update(sys);

    # def delete(self, id):
    #     return self.dal.delete(id);

    # def get_list_by_condition(self, sc):
    #     return self.dal.get_list_by_condition(sc);

        
