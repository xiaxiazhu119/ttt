from x_py_libs.db.db_helper_base import *
from enums.app_enum import StatusEnum

from models import OrganizationModel
from .dal_base import BaseDAL


class OrganizationDAL(BaseDAL):

    def  __init__(self, **kwargs):
        self.base_table_name = 'or_organization'
        self.base_fields_for_insert = 'name,contact,tel,status'
        self.base_fields_for_read = 'id,' + self.base_fields_for_insert
        super().__init__(**kwargs)


    def get_list_by_condition(self, sc):
        # conditions = [DBConditionHelper.get_equal_condition('is_deleted', 0)]
        conditions = []

        keyword = sc.get('keyword')
        # print('keyword:', keyword)
        if keyword is not None and keyword != '':
            conditions.append([
                    DBConditionHelper.get_like_lr_condition('name', keyword, has_comma=False, use_and_or=False),
                    DBConditionHelper.get_like_lr_condition('contact', keyword, has_comma=False, and_or=DBAndOrEnum.OR),
                    DBConditionHelper.get_like_lr_condition('tel', keyword, has_comma=False, and_or=DBAndOrEnum.OR)
                ])

        status = sc.get('status')
        if status is not None and status != 0:
            conditions.append(DBConditionHelper.get_equal_condition('status', status))


        # rst, cnt = self.db_helper.get_list('or_organization', 'id,name,contact,tel,status', conditions=conditions, page_index=sc.get('page_index'), page_size=sc.get('page_size'))
        # return rst, cnt
        self.list_query_table_name = 'or_organization'
        self.list_query_fields = 'id,name,contact,tel,status'
        self.list_query_conditions = conditions
        return super().get_list_by_condition(sc)

    def get_simple_enabled_list(self):
        conditions = [
                DBConditionHelper.get_equal_condition('is_deleted', 0),
                DBConditionHelper.get_equal_condition('status', StatusEnum.Normal.value)
                ]

        rst, cnt = self.db_helper.get_simple_list('or_organization', 'id,name', conditions=conditions)
        return rst, cnt

