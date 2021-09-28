from x_py_libs.db.db_helper_base import DBConditionHelper
from x_py_libs.helpers.utilities_helper import UtilitiesHelper
from enums.app_enum import RoleEnum, SysDictTypeEnum
from models import UserFinanceModel, UserPassportModel, UserProfileModel
from .dal_base import BaseDAL


class UserGroupDAL(BaseDAL):
  
    def  __init__(self, **kwargs):
        self.base_table_name = 'or_user_group'
        self.base_fields_for_read = 'id,name, status, leader, cnt'
        super().__init__(**kwargs)

    def get_list_by_condition(self, sc):
        conditions = []
        # conditions = [DBConditionHelper.get_equal_condition(('is_deleted'), False)]

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

        # rst, cnt = self.db_helper.get_list(self.base_table_name, self.base_fields_for_read, conditions=conditions, page_index=sc.get('page_index'), page_size=sc.get('page_size'))
        # return rst, cnt

        self.list_query_table_name = self.base_table_name
        self.list_query_fields = self.base_fields_for_read
        self.list_query_conditions = conditions
        return super().get_list_by_condition(sc)

    def get_exclude(self, id):
        sql = 'SELECT id, name FROM or_v_user WHERE role = %s AND id NOT IN (SELECT user_id FROM or_user_group_relation WHERE group_id = %s);'
        return self.db_helper.fetch_all(sql, (RoleEnum.Expert.value, id,))

    def create_relation(self, group_id, user_ids):
        table_name = 'or_user_group_relation'
        fields = ['group_id', 'user_id']
        params = [(group_id, user_id) for user_id in user_ids]
        # return self.create_multiple(table_name=table_name, fields=fields, params=params)
        cnt = self.create_multiple(table_name=table_name, fields=fields, params=params)
        if cnt > 0:
            self.refresh_group_leader_cnt_info(group_id, refresh_leader=False)
        return cnt

    def get_relation_users(self, group_id):
        conditions = [DBConditionHelper.get_equal_condition('group_id', group_id)]
        rst, cnt = self.db_helper.get_simple_list('or_v_user_group_relation', 'group_id, user_id, is_leader, name, mobile, group_name', conditions=conditions, order_field='user_id')
        return rst, cnt

    def delete(self, id):
        cnt = super().delete(id)
        if cnt > 0:
            sql = 'DELETE FROM or_user_group_relation WHERE group_id = %s;'
            self.db_helper.fetch_rowcount(sql, (id,))
        return cnt
        
    def delete_relation(self, group_id, users):
        sql = 'DELETE FROM or_user_group_relation WHERE group_id = %s AND user_id IN %s;'
        cnt = self.db_helper.fetch_rowcount(sql, (group_id, users,))
        if cnt > 0:
            self.refresh_group_leader_cnt_info(group_id);
        return cnt

    def switch_group_leader(self, group_id, user_id, is_leader):
        # cancel_leader_sql = 'UPDATE or_user_group_relation SET is_leader = 0 WHERE group_id = %s;'
        sql = ''
        params = ()
        if is_leader:
            sql = 'UPDATE or_user_group_relation SET is_leader = CASE WHEN user_id = %s THEN True ELSE False END WHERE group_id = %s;'
            params = (user_id, group_id,)
        else:
            sql = 'UPDATE or_user_group_relation SET is_leader = %s WHERE user_id = %s AND group_id = %s;'
            params = (is_leader, user_id, group_id,)
        
        cnt = self.db_helper.fetch_rowcount(sql, params)

        if is_leader and cnt > 0:
            self.refresh_group_leader_cnt_info(group_id, refresh_cnt=False)

        return cnt

    # def get_group_leader_info(self, group_id):
    #     sql = 'SELECT user_id, name FROM or_v_user_group_relation WHERE group_id = %s AND is_leader = 1;'
    #     data = self.db_helper.fetch_one(sql, (group_id, ))
    #     print(data)
  
    # def get_group_cnt_info(self, group_id):
    #     sql = 'SELECT COUNT(1) FROM or_user_group_relation WHERE group_id = %s;'
    #     return self.db_helper.fetch_one(sql, (group_id,))

    def refresh_group_leader_cnt_info(self, group_id, refresh_leader=True, refresh_cnt=True):

        if not refresh_leader and not refresh_cnt:
            return 0

        fields = []
        params = []
        
        if refresh_leader:
            fields.append(' leader = (SELECT JSON_OBJECT(\'key\', p.user_id, \'value\', p.name) FROM or_user_profile p INNER JOIN or_user_group_relation r ON p.user_id = r.user_id WHERE group_id = %s AND is_leader = 1) ')
            params.append(group_id)
        
        if refresh_cnt:
            fields.append(' cnt = (SELECT COUNT(1) AS cnt FROM or_user_group_relation WHERE group_id = %s) ')
            params.append(group_id)

        params.append(group_id)

        sql = 'UPDATE or_user_group SET ' + ','.join(fields) + ' WHERE id = %s;'
        self.db_helper.fetch_rowcount(sql, tuple(params))
