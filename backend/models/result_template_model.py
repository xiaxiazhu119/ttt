from .model_base import BaseModel


class ResultTemplateModel(BaseModel):
    
    id = 0
    name = 0
    controls = None
  
    def __init__(self, **kw):
        self.id = kw.get('id')
        self.name = kw.get('name')
        self.controls = kw.get('controls')
        super().__init__()

    def get_table_name(self):
        return 'or_result_template'

