from pymysql import NUMBER
from x_py_libs.db.db_helper_base import DBConditionHelper
from x_py_libs.helpers.utilities_helper import UtilitiesHelper

from models.review_model import ReviewModel
from .dal_base import BaseDAL


class ReviewDAL(BaseDAL):
  
    def  __init__(self, **kwargs):
        self.base_table_name = 'or_review'
        # self.base_fields_for_insert = 'type,name,ext'
        self.base_fields_for_read =   ','.join(vars(ReviewModel()))
        super().__init__(**kwargs)

    def create(self, data):
        id = super().create(data)
        self.create_log(id)
        return id

    def update(self, data):
        self.create_log(data.id)
        return super().update(data)

    def create_log(self, id):
        sql = """
            INSERT INTO or_review_logs (review_id,review_contents)
            SELECT 
                id,
                JSON_OBJECT(
                    'id', id,
                    'user_id', user_id,
                    'result_id', result_id,
                    'scores', scores,
                    'total_score', total_score,
                    'opinion', opinion,
                    'create_time', create_time,
                    'is_deleted', is_deleted
                )
            FROM 
                or_review
            WHERE 
                id = %s;            
        """
        return self.db_helper.fetch_rowcount(sql, (id,))
        
    def get_list_by_condition(self, sc):

        result_id = sc.get('resultId')
        task_id = sc.get('taskId')
        user_id = sc.get('userId')

        conditions = []
        raw_conditions = []

        equal_fields = ['resultId']
        for field in equal_fields:
            value = sc.get(field)
            if value is not None and value != '' and int(value) != 0:
                conditions.append(DBConditionHelper.get_equal_condition(UtilitiesHelper.camel_2_snake(field), value))
        
        if user_id is not None and user_id != '' and int(user_id) != 0:
            user_scope_sql = """
            AND user_id IN (
                SELECT 
                    user_id 
                FROM 
                    or_user_group_relation 
                WHERE 
                    group_id IN (
                        SELECT group_id FROM or_v_user_group_task_group_relation WHERE task_id = %s AND user_id = %s
                    )
                )
            """ % (task_id, user_id)
            raw_conditions.append(user_scope_sql)

        
        self.list_query_table_name = 'or_v_user_review_relation'
        self.list_query_fields = 'id,user_id,scores,total_score,opinion,create_time,user_name,name,mobile,org_name'
        self.list_query_conditions = conditions
        self.list_query_raw_conditions = ''.join(raw_conditions)
        self.list_query_add_deleted_condition = False
        return super().get_list_by_condition(sc)
        