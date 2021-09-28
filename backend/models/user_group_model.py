from x_py_libs.helpers.utilities_helper import UtilitiesHelper
from enums.app_enum import FinanceTypeEnum, RoleEnum, StatusEnum
from .model_base import BaseModel


class UserGroupModel(BaseModel):

    id = 0
    name = None
    status = None
    leader = None
    cnt = 0

    def __init__(self, **kw):
        self.id = kw.get('id')
        self.name = kw.get('name')
        self.status = kw.get('status')
        self.leader = kw.get('leader')
        self.cnt = kw.get('cnt')
        super().__init__()

    def get_table_name(self):
        return 'or_user_group'
        
class UserGroupRelationModel(BaseModel):

    group_id = 0
    user_id = 0
    is_leader = False

    def __init__(self, **kw):
        self.group_id = kw.get('group_id')
        self.user_id = kw.get('user_id')
        self.is_leader = kw.get('is_leader')
        super().__init__()

    def get_table_name(self):
        return 'or_user_group_relation'
