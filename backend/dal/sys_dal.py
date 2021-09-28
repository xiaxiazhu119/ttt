from x_py_libs.db.db_helper_base import DBConditionHelper
from .dal_base import BaseDAL


class SysDAL(BaseDAL):
  
    def  __init__(self, **kwargs):
        self.base_table_name = 'or_sys'
        self.base_fields_for_insert = 'type,name,ext'
        self.base_fields_for_read = 'id,' + self.base_fields_for_insert
        super().__init__(**kwargs)

    def get_list_by_condition(self, sc):
        conditions = []
        # conditions = [
        #         DBConditionHelper.get_equal_condition('is_deleted', 0)
        #         ]

        type = sc.get('type');
        if type is not None and type != '0':
            conditions.append(
                DBConditionHelper.get_equal_condition('type', type)
            )
            
        # page_index = sc.get('pageIndex')
        # page_size =
        # rst, cnt = self.db_helper.get_list('or_sys', 'id,type,name', conditions=conditions, pagination=False)
        # return rst, cnt
        self.list_query_table_name = self.base_table_name
        self.list_query_fields = 'id,type,name'
        self.list_query_conditions = conditions
        self.list_query_pagination = False
        return super().get_list_by_condition(sc)

        