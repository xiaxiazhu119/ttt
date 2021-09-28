from x_py_libs.db.db_helper_base import DBConditionHelper
from x_py_libs.helpers.utilities_helper import UtilitiesHelper
from enums.app_enum import SysDictTypeEnum
from models import UserFinanceModel, UserPassportModel, UserProfileModel
from .dal_base import BaseDAL

import re


class UserDAL(BaseDAL):
  
    def  __init__(self, **kwargs):
        self.base_table_name = 'or_user'
        # self.base_fields_for_insert = 'name,contact,tel,status'
        # self.base_fields_for_read = 'id,' + self.base_fields_for_insert
        super().__init__(**kwargs)

    def sign_in(self, up):
        sql = 'SELECT id, user_name, role, role_ext, status, name, mobile, org_id, org_name, position, job, title, remark FROM or_v_user WHERE user_name = %s AND pwd = %s AND status= %s;'    
        user = self.db_helper.fetch_one(sql, (up.user_name, up.pwd_encrypted, up.status,))
        return user

    def sign_up(self, up):
        up.pwd = up.pwd_encrypted
        sql = 'SELECT COUNT(1) AS cnt FROM or_user WHERE user_name = %s;'
        rst = self.db_helper.fetch_one(sql, (up.user_name,))
        cnt = rst['cnt']
        if cnt > 0:
            return -1
        
        profile = UserProfileModel()
        profile.name = up.name

        user = {
            'up': up,
            'p': profile
        }
        
        return self.create(user)

    def create(self, user):
        up = user.get('up')
        profile = user.get('p')

        id = super().create(up)
        # id = 30
        if id > 0:
            profile.user_id = id
            cnt = super().create(profile, False)

            cnt += self.update_fields(id, profile.field_id_list)
            cnt += self.create_update_finances(profile.finances, id)


        return id 

    def update(self, user):
        up = user.get('up')
        profile = user.get('p')
        # print(profile)
        cnt = 0
        if up is not None:
            cnt += super().update(up)
        if profile is not None:
            cnt += super().update(profile)
            cnt += self.update_fields(up.id, profile.field_id_list)
            cnt += self.create_update_finances(profile.finances)

        return cnt

    def read_view(self, user_id):
        sql = 'SELECT id, user_name, role, role_ext, status, name, mobile, org_id, org_name, position, job, title, remark FROM or_v_user WHERE id = %s;'
        user_view = self.db_helper.fetch_one(sql, (user_id, ))
        fields = self.get_field_relation(user_id)
        finances = self.get_finances(user_id)
        return user_view, fields, finances

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

        equal_fields = ['status', 'role', 'orgId']
        for field in equal_fields:
            value = sc.get(field)
            if value is not None and value != '' and int(value) != 0:
                conditions.append(DBConditionHelper.get_equal_condition(UtilitiesHelper.camel_2_snake(field), value))

        
        self.list_query_table_name = 'or_v_user'
        self.list_query_fields = 'id,user_name,role,role_ext,status,name,mobile,org_id,position,job,title,org_name'
        self.list_query_conditions = conditions
        self.list_query_add_deleted_condition = False
        return super().get_list_by_condition(sc)

    #region field

    def update_fields(self, user_id, field_id_list):

        if field_id_list is None:
            return 0
        
        table_name = 'or_user_field_relation'
        fields = ['user_id' , 'field_id']
        params = [( user_id, field_id) for field_id in field_id_list]
        cnt = self.create_multiple(table_name=table_name, fields=fields, params=params, delete=True, uq_filed='user_id', uq_value=user_id)
        return cnt
            
    def get_field_relation(self, user_id):
        sql = """
            SELECT
                s.id, s.name, CASE WHEN r.user_id IS NULL THEN False ELSE True END AS activated
            FROM
                or_sys AS s
                LEFT OUTER JOIN (
                    SELECT 
                        user_id, field_id 
                    FROM 
                        or_user_field_relation 
                    WHERE 
                        user_id = %s
                    ) AS r ON s.id = r.field_id
            WHERE
                s.is_deleted = 0
                AND s.type = %s
            ORDER BY 
                s.id DESC
            ;
        """
        return self.db_helper.fetch_all(sql, (user_id, SysDictTypeEnum.Field.value,))
    
    #endregion

    #region finance

    def get_finances(self, user_id):
        sql = 'SELECT id, user_id, type, account, account_ext, status FROM or_user_finance WHERE is_deleted = 0 AND user_id = %s;'
        return self.db_helper.fetch_all(sql, (user_id,))

    def create_update_finances(self, finances, user_id = 0):
        if finances is None:
            return 0
        cnt = 0
        for_create = []
        for_update = []
        for finance in finances:
            # print(UtilitiesHelper.json_dumps_dict(finance))
            if finance.id == 0:
                if user_id != 0:
                    finance.user_id = user_id
                for_create.append(finance)
            else:
                for_update.append(finance)
        
        # print(for_create)
        # print(for_update)
        if len(for_create) > 0:
            if user_id != 0:
                for f in finances:
                    f.user_id = user_id
            cnt += super().create_multiple(for_create)
        
        if len(for_update) > 0:
            cnt += super().update(for_update)
            
        return cnt

    def delete_finance(self, id):
        return super().delete(id, 'or_user_finance')

    #endregion
    