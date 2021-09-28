from pymysql import paramstyle
from x_py_libs.db.db_helper_base import DBConditionHelper
from x_py_libs.db.db_helper_mysql import MySqlDBHelper

from helper.app_config_helper import AppConfigHelper

# from helper.db_helper_mysql_ext import *

from models import *
import sys


class BaseDAL(object):
  
    db_helper = None
    base_table_name = ''
    base_fields_for_insert = ''
    base_fields_for_read = ''

    list_query_table_name = None
    list_query_fields = None
    list_query_conditions = []
    list_query_raw_conditions = ''
    list_query_pagination = True
    list_query_add_deleted_condition = True

    # globals()[class_name]

    def __init__(self, **kwargs):

        config = AppConfigHelper.get_db_connection_config()

        user = config.get('user')
        pwd = config.get('pwd')
        host = config.get('host')
        port = config.get('port')
        db = config.get('db')
        
        self.list_query_table_name = None
        self.list_query_fields = None
        self.list_query_conditions = []
        self.list_query_raw_conditions = ''
        self.list_query_pagination = True
        self.list_query_add_deleted_condition = True

        self.db_helper = MySqlDBHelper('',
                                user=user, password=pwd,
                                host=host, port=port,
                                database=db,
                                use_pure=False)
        super().__init__()

    def get_table_config(self, data, is_create=True):
        class_name = data.__name__ if hasattr(data, '__name__') else type(data).__name__
        obj = globals()[class_name]()
        uq = obj.get_UQ()
        pk = obj.get_PK()
        attrs = vars(obj)
        table_name = obj.get_table_name()
        exclude_fields = []
        if is_create:
            exclude_fields.extend(obj.exclude_while_create())
            exclude_fields.append(pk)
        else:
            exclude_fields.extend(obj.exclude_while_update())
            exclude_fields.append(uq)
        # field not in ['org_name', 'fields', 'finances']
        fields = list(filter(lambda field: field not in exclude_fields, attrs))
        
        return table_name, uq, fields


    def create(self, data, returning_id=True):

        table_name, uq, fields = self.get_table_config(data)

        sql = 'INSERT INTO ' + table_name + ' (' + ','.join(fields) + ') VALUES %s;'
        params = [tuple(list(map(lambda x: getattr(data, x), fields)))]

        if returning_id:
            return self.db_helper.fetch_returning_id(sql, params)
        return self.db_helper.fetch_rowcount(sql, params)

    def create_multiple(self, data_list=[], table_name='', fields=[], params=[], delete=False, uq_filed='', uq_value=''):
        
        if table_name == '' and len(fields) == 0 and len(params) == 0:
            if data_list is None or len(data_list) == 0:
                return 0

            table_name, uq, fields = self.get_table_config(data_list[0])
            # print(table_name, uq, fields)

            for data in data_list:
                params.append(tuple(list(map(lambda x: getattr(data, x), fields))))

        if delete:
            self.db_helper.fetch_rowcount('DELETE FROM ' + table_name + ' WHERE ' + uq_filed + ' = %s;', (uq_value,))

        # print(params)
        sql = 'INSERT INTO ' + table_name + '(' + ','.join(fields) + ') VALUES (' + ','.join([('%s') for i in range(0, len(fields))]) + ') '
        return self.db_helper.fetch_many_rowcount(sql, params)
        # return 0 

    def read(self, id):
        sql = 'SELECT ' + self.base_fields_for_read + ' FROM ' + self.base_table_name + ' WHERE is_deleted = 0 AND id = %s;'
        return self.db_helper.fetch_one(sql, (id, ))

    # only for same table
    def update(self, data):
        data_list = data if type(data) is list else [data]

        sql_list = []
        total_params = []
        table_name, uq, fields = self.get_table_config(data_list[0])

        for data in data_list:
        
            field_conditions = []
            params = []

            for field in fields:
                value = getattr(data, field)
                # print(field, value)
                if value is not None:
                    field_conditions.append(field + ' = %s')
                    params.append(value)

            sql = 'UPDATE ' + table_name + ' SET ' + ','.join(field_conditions) + ' WHERE ' + uq + ' = %s;'
            params.append(getattr(data, uq))

            sql_list.append(sql)
            total_params.append(tuple(params))

        return self.db_helper.fetch_many_rowcount(sql_list[0], total_params)

    def delete(self, id, table_name=None):
        table_name = self.base_table_name if table_name is None or table_name == '' else table_name
        sql = 'UPDATE ' + table_name + ' SET is_deleted = 1 WHERE id = %s';
        return self.db_helper.fetch_rowcount(sql, (id,))

    def get_list_by_condition(self, sc):
        if self.list_query_add_deleted_condition:
            self.list_query_conditions.append(DBConditionHelper.get_equal_condition('is_deleted', 0))

        self.list_query_table_name = self.base_table_name if self.list_query_table_name is None or self.list_query_table_name == '' else self.list_query_table_name
            
        rst, cnt = self.db_helper.get_list(self.list_query_table_name, self.list_query_fields, conditions=self.list_query_conditions, raw_conditions=self.list_query_raw_conditions, page_index=sc.get('page_index'), page_size=sc.get('page_size'), pagination=self.list_query_pagination)
        return rst, cnt