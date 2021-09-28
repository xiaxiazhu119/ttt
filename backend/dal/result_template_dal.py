from x_py_libs.db.db_helper_base import *
from x_py_libs.helpers.utilities_helper import UtilitiesHelper
from enums.app_enum import StatusEnum

from models import ResultModel
from .dal_base import BaseDAL


class ResultTemplateDAL(BaseDAL):

    def  __init__(self, **kwargs):
        self.base_table_name = 'or_result_template'
        self.base_fields_for_read = 'id,name,controls'
        super().__init__(**kwargs)
  
    def get_list_by_condition(self, sc):
        conditions = []

        keyword = sc.get('keyword')
        # print('keyword:', keyword)
        if keyword is not None and keyword != '':
            conditions.append([
                    DBConditionHelper.get_like_lr_condition('name', keyword, has_comma=False, use_and_or=False),
                    # DBConditionHelper.get_like_lr_condition('contact', keyword, has_comma=False, and_or=DBAndOrEnum.OR),
                    # DBConditionHelper.get_like_lr_condition('tel', keyword, has_comma=False, and_or=DBAndOrEnum.OR)
                ])

        # self.list_query_table_name = self.base_table_name
        self.list_query_fields = 'id, name, controls'
        self.list_query_conditions = conditions
        return super().get_list_by_condition(sc)
        