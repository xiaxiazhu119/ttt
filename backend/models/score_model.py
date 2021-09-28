from .model_base import BaseModel


class ScoreItemModel(BaseModel):
  
    id = 0
    name = None
    remark = None
    min_value = None
    max_value = None

    def __init__(self, **kw):
        self.id = kw.get('id')
        self.name = kw.get('name')
        self.remark = kw.get('remark')
        self.min_value = kw.get('remmin_valueark')
        self.max_value = kw.get('max_value')
        super().__init__()

    def get_table_name(self):
        return 'or_score_item'

class ScoreTempalteModel(BaseModel):
  
    def __init__(self, **kw):
        self.id = 0
        self.name = None
        super().__init__()

    def get_table_name(self):
        return 'or_score_template'
