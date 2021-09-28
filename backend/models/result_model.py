from .model_base import BaseModel


class ResultModel(BaseModel):
    
    id = 0
    task_id = 0
    user_id = 0
    contents = None
  
    def __init__(self, **kw):
        self.id = kw.get('id')
        self.task_id = kw.get('task_id')
        self.user_id = kw.get('user_id')
        self.contents = kw.get('contents')

        super().__init__()
        