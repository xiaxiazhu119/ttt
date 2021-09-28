from x_py_libs.db.db_helper_base import *
from x_py_libs.helpers.utilities_helper import UtilitiesHelper
from enums.app_enum import StatusEnum

from models import ResultModel
from .dal_base import BaseDAL


class ResultDAL(BaseDAL):

    def  __init__(self, **kwargs):
        self.base_table_name = 'or_result'
        self.base_fields_for_read =   'id,task_id,user_id,contents'
        super().__init__(**kwargs)
  
    def get_list_by_condition(self, sc):
        conditions = []
        raw_conditions = []

        # keyword = sc.get('keyword')
        # # print('keyword:', keyword)
        # if keyword is not None and keyword != '':
        #     conditions.append([
        #             DBConditionHelper.get_like_lr_condition('name', keyword, has_comma=False, use_and_or=False),
        #             # DBConditionHelper.get_like_lr_condition('contact', keyword, has_comma=False, and_or=DBAndOrEnum.OR),
        #             # DBConditionHelper.get_like_lr_condition('tel', keyword, has_comma=False, and_or=DBAndOrEnum.OR)
        #         ])

        equal_fields = ['taskId']
        user_id = sc.get('userId')
        is_expert = sc.get('isExpert')

        if is_expert:
            print('abc')
        else:
            equal_fields.append('userId')

        for field in equal_fields:
            value = sc.get(field)
            if value is not None and value != '' and int(value) != 0:
                conditions.append(DBConditionHelper.get_equal_condition(UtilitiesHelper.camel_2_snake(field), value))


        # print(user_id, is_expert)

        self.list_query_table_name = 'or_v_user_task_result_relation'
        self.list_query_fields = 'result_id,task_id,user_id,contents,create_time,name,mobile,task_name'
        self.list_query_conditions = conditions
        self.list_query_add_deleted_condition = False
        return super().get_list_by_condition(sc)

    def check_submitted_by_user_id(self, user_id):
        sql = 'SELECT id, task_id FROM or_result WHERE is_deleted = 0 AND user_id = %s;'
        return self.db_helper.fetch_all(sql, (user_id, ))

    def check_reviewed_by_user_id(self, user_id, result_ids=[]):
        sql = 'SELECT id, result_id FROM or_review WHERE is_deleted = 0 AND user_id = %s'
        params = [user_id]
        if result_ids is not None and len(result_ids) > 0:
            sql += ' AND result_id IN %s '
            params.append(result_ids)
        sql += ';'
        return self.db_helper.fetch_all(sql, tuple(params))
