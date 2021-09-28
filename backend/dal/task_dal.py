from x_py_libs.db.db_helper_base import *
from x_py_libs.helpers.utilities_helper import UtilitiesHelper
from enums.app_enum import StatusEnum

from models import TaskModel
from .dal_base import BaseDAL


class TaskDAL(BaseDAL):
    def  __init__(self, **kwargs):
        self.base_table_name = 'or_task'
        self.base_fields_for_read =   ','.join(list(filter(lambda field: field not in ['groups', 'group_ids', 'result_template'], vars(TaskModel())))) + self.get_date_check_statement()
        super().__init__(**kwargs)
  
    def create(self, data):
        id = super().create(data)
        if id > 0:
            self.create_task_group_relation(id, data.group_ids)
            self.create_task_result_template_relation(id, data.result_template)
        return id

    def update(self, data):
        cnt = super().update(data)
        # if cnt > 0:
        cnt += self.create_task_group_relation(data.id, data.group_ids)
        cnt += self.create_task_result_template_relation(data.id, data.result_template)
        return cnt

    def get_task_group_relation(self, task_id):
        sql = 'SELECT g.id, g.name FROM or_task_group_relation r INNER JOIN or_user_group g ON r.group_id = g.id WHERE r.task_id = %s AND g.is_deleted = 0;'
        return self.db_helper.fetch_all(sql, (task_id,))
        
    def create_task_group_relation(self, task_id, group_ids):
        # sql = 'DELETE FROM or_task_group_relation WHERE task_id = %s; ' % task_id
        # self.db_helper.fetch_rowcount(sql)
        # group_ids = group_ids.split(',')
        table_name = 'or_task_group_relation'
        fields = ['task_id', 'group_id']
        params = [(task_id, group_id) for group_id in group_ids]
        # return self.create_multiple(table_name=table_name, fields=fields, params=params)
        cnt = self.create_multiple(table_name=table_name, fields=fields, params=params, delete=True, uq_filed='task_id', uq_value=task_id)
        return cnt

    def create_task_result_template_relation(self, task_id, rt):
        sql = 'DELETE FROM or_task_result_template_relation WHERE task_id = %s;'
        cnt = self.db_helper.fetch_rowcount(sql, (task_id, ))
        sql = 'INSERT INTO or_task_result_template_relation(task_id, template_id, template_name, controls)VALUES(%s,%s,%s,%s);'
        template_id = rt.get('id')
        template_name = rt.get('name')
        controls = rt.get('controls')
        # print(ontrols, type(controls))
        cnt += self.db_helper.fetch_rowcount(sql, (task_id, template_id, template_name, controls,))
        return cnt
        # return self.db_helper.fetch_rowcount(sql, (task_id, task_id, template_id, template_name, controls,))

    def get_list_by_condition(self, sc):
        conditions = []
        # conditions = [DBConditionHelper.get_equal_condition('is_deleted', 0)]
        raw_conditions = []

        keyword = sc.get('keyword')
        # print('keyword:', keyword)
        if keyword is not None and keyword != '':
            conditions.append([
                    DBConditionHelper.get_like_lr_condition('name', keyword, has_comma=False, use_and_or=False),
                    # DBConditionHelper.get_like_lr_condition('contact', keyword, has_comma=False, and_or=DBAndOrEnum.OR),
                    # DBConditionHelper.get_like_lr_condition('tel', keyword, has_comma=False, and_or=DBAndOrEnum.OR)
                ])

        equal_fields = ['status']
        for field in equal_fields:
            value = sc.get(field)
            if value is not None and value != '' and int(value) != 0:
                conditions.append(DBConditionHelper.get_equal_condition(UtilitiesHelper.camel_2_snake(field), value))

        user_id = sc.get('userId')
        is_expert = sc.get('isExpert')
        # print('user_id:', user_id, 'is_expert:', is_expert)

        if is_expert is not None and is_expert:
            raw_conditions.append( ' AND id IN (SELECT task_id FROM or_v_user_group_task_group_relation WHERE user_id = %s) ' % user_id)

        self.list_query_table_name = 'or_v_task'
        self.list_query_fields = 'id,name,levy_start_date,levy_end_date,review_start_date,review_end_date,in_levying,in_reviewing,expired,has_result,task_started'
        self.list_query_conditions = conditions
        self.list_query_raw_conditions = ''.join(raw_conditions)
        self.list_query_add_deleted_condition = False
        return super().get_list_by_condition(sc)

    def get_date_check_statement(self):
        return """ ,
                CASE WHEN levy_start_date <= CURDATE() THEN True ELSE False END AS task_started,
                CASE WHEN levy_start_date <= CURDATE() AND CURDATE() <= levy_end_date THEN True ELSE False END AS in_levying,
                CASE WHEN review_start_date <= CURDATE() AND CURDATE() <= review_end_date THEN True ELSE False END AS in_reviewing,
                CASE WHEN CURDATE() > review_end_date THEN True ELSE False END AS expired
            """

    # def get_user_task_relation(self, task_id, user_id):

    def get_expert_task_relation(self):
        pass

    def get_task_result_template_relation(self, task_id):
        sql = 'SELECT template_id AS id, template_name AS name, controls FROM or_task_result_template_relation WHERE task_id = %s;'
        return self.db_helper.fetch_one(sql, (task_id,))
