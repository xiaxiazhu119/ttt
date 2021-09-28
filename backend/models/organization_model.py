from enums.app_enum import StatusEnum
from .model_base import BaseModel


class OrganizationModel(BaseModel):

    id = 0
    name = None
    contact = None
    tel = None
    status = None
    create_time = None

    def __init__(self, **kw):
        self.id = kw.get('id')
        self.name = kw.get('name')
        self.contact = kw.get('contact')
        self.tel = kw.get('tel')
        self.status = kw.get('status')
        super().__init__()
