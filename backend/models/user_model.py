from x_py_libs.helpers.utilities_helper import UtilitiesHelper
from enums.app_enum import FinanceTypeEnum, RoleEnum, StatusEnum
from .model_base import BaseModel


class UserModel(BaseModel):

    id = 0
    user_name = None
    pwd = None
    role = None
    role_ext = None
    status = None

    def __init__(self, **kw):
        self.id = kw.get('id')
        self.user_name = kw.get('userName')
        self.pwd = kw.get('pwd')
        self.role = kw.get('role')
        self.role_ext = kw.get('roleExt')
        self.status = kw.get('status')
        super().__init__()
        

class UserPassportModel(UserModel):

    confirm_pwd = None
    pwd_encrypted = None
    captcha = None
    captcha_chars = None

    def __init__(self, **kw):
        super().__init__()

    def get_table_name(self):
        return 'or_user'

    def exclude_while_create(self):
        return ['captcha', 'captcha_chars', 'confirm_pwd', 'pwd_encrypted', 'name']
    

class UserProfileModel(BaseModel):

    user_id = 0
    name = None
    mobile = None
    org_id = 0
    org_name = None
    position = None         # 职务
    job = None              # 岗位
    title = None            # 职称
    remark = None

    fields = []
    finances = []

    field_id_list = []

    def __init__(self, **kw):
        self.user_id = kw.get('userId')
        self.name = kw.get('name')
        self.mobile = kw.get('mobile')
        self.org_id = kw.get('orgId')
        self.org_name = kw.get('orgName')
        self.position = kw.get('position')
        self.job = kw.get('job')
        self.title = kw.get('title')
        self.remark = kw.get('remark')

        fields = kw.get('fields')
        if fields is not None:
            if type(fields) is str and fields != '':
                fields = UtilitiesHelper.json_loads(fields)
            self.fields = fields

        finances = kw.get('finances')
        if finances is not None:
            if type(finances) is str and finances != '':
                finances = UtilitiesHelper.json_loads(finances)
            self.finances = finances

        self.field_id_list = kw.get('fieldIdList')

        super().__init__()

    def get_UQ(self):
        return 'user_id'

    def exclude_while_create(self):
        return ['org_name', 'fields', 'finances', 'field_id_list']

    def exclude_while_update(self):
        return ['org_name', 'fields', 'finances', 'field_id_list']

class UserViewModel(BaseModel):
    id = 0
    user_name = None
    role = RoleEnum.Normal.value
    role_ext = RoleEnum.Normal.value
    status = StatusEnum.Normal.value
    name = None
    mobile = None
    org_id = 0
    org_name = None
    position = None         # 职务
    job = None              # 岗位
    title = None            # 职称
    remark = None
    
    def __init__(self, **kw):
        self.id = kw.get('id')
        self.user_name = kw.get('user_name')
        self.role = kw.get('role')
        self.role_ext = kw.get('role_ext')
        self.status = kw.get('status')
        self.name = kw.get('name')
        self.mobile = kw.get('mobile')
        self.org_id = kw.get('org_id')
        self.org_name = kw.get('org_name')
        self.position = kw.get('position')
        self.job = kw.get('job')
        self.title = kw.get('title')
        self.remark = kw.get('remark')
        super().__init__()

class UserFieldModel(BaseModel):

    user_id = 0
    field_id = 0
    field_name = None
    
    def __init__(self, **kw):
        self.user_id = kw.get('user_id')
        self.field_id = kw.get('field_id')
        self.field_name = kw.get('field_name')
        super().__init__()

class UserFinanceModel(BaseModel):

    id = 0
    user_id = None
    type = None
    account = None
    account_ext = None  # while type is bank it's meaning card no 
    status = None

    def __init__(self, **kw):
        self.id = kw.get('id')
        self.user_id = kw.get('userId')
        self.type = kw.get('type')
        self.account = kw.get('account')
        self.account_ext = kw.get('accountExt')
        self.status = kw.get('status')
        super().__init__()

    def exclude_while_update(self):
        return ['org_name', 'fields', 'finances', 'field_id_list']