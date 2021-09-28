from x_py_libs.db.db_helper_base import DBConditionHelper

from models.score_model import ScoreItemModel
from .dal_base import BaseDAL


class ScoreItemDAL(BaseDAL):
  
    def  __init__(self, **kwargs):
        self.base_table_name = 'or_score_item'
        # self.base_fields_for_insert = 'type,name,ext'
        # self.base_fields_for_read = 'id,' + self.base_fields_for_insert
        super().__init__(**kwargs)

    def get_list_by_condition(self, sc):
        conditions = []
        raw_conditions = []

        # print(sc)

        task_id = sc.get('taskId')
        if task_id is not None and task_id != 0:
            raw_conditions.append( ' AND id IN (SELECT item_id FROM or_task_score_item_relation WHERE task_id = %s) ' % task_id)

        
        # page_index = sc.get('pageIndex')
        # page_size =
        # rst, cnt = self.db_helper.get_list('or_sys', 'id,type,name', conditions=conditions, pagination=False)
        # return rst, cnt
        self.list_query_table_name = self.base_table_name
        self.list_query_fields = ','.join(vars(ScoreItemModel()))
        # self.list_query_conditions = conditions
        self.list_query_raw_conditions = ' '.join(raw_conditions)
        self.list_query_pagination = False
        return super().get_list_by_condition(sc)
    
    def create_task_score_item_relation(self, task_id, score_ids):
        table_name = 'or_task_score_item_relation'
        fields = ['task_id', 'item_id']
        params = [(task_id, score_id) for score_id in score_ids]
        # return self.create_multiple(table_name=table_name, fields=fields, params=params)
        cnt = self.create_multiple(table_name=table_name, fields=fields, params=params, delete=True, uq_filed='task_id', uq_value=task_id)
        return cnt

    def get_task_score_item_relation(self, task_id):
        sql = 'SELECT ' + ','.join(vars(ScoreItemModel())) + ' FROM or_score_item AS si INNER JOIN or_task_score_item_relation AS r ON si.id = r.item_id WHERE si.is_deleted = 0 AND r.task_id = %s;'
        return self.db_helper.fetch_all(sql, (task_id,))

        

class ScoreTemplateDAL(BaseDAL):
  
    def  __init__(self, **kwargs):
        self.base_table_name = 'or_score_template'
        # self.base_table_name = 'or_sys'
        # self.base_fields_for_insert = 'type,name,ext'
        # self.base_fields_for_read = 'id,' + self.base_fields_for_insert
        super().__init__(**kwargs)

    def get_list_by_condition(self, sc):
        conditions = []
            
        self.list_query_table_name = self.base_table_name
        self.list_query_fields = 'id,name'
        # self.list_query_conditions = conditions
        self.list_query_pagination = False
        return super().get_list_by_condition(sc)
