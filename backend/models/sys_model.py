from .model_base import BaseModel


class SysModel(BaseModel):

    id = 0
    type = None
    name = None
    ext = None

    def __init__(self, **kw):
        self.id = kw.get('id')
        self.type = kw.get('type')
        self.name = kw.get('name')
        self.ext = kw.get('ext')
        super().__init__()
