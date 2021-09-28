from x_py_libs.helpers.utilities_helper import UtilitiesHelper
from .model_base import BaseModel


class ReviewModel(BaseModel):

    id = 0
    user_id = 0
    result_id = 0
    scores = None
    total_score = 0
    opinion = None
  
    def __init__(self, **kw):
        self.id = kw.get('id')
        self.user_id = kw.get('user_id')
        self.result_id = kw.get('result_id')
        self.scores = kw.get('scores')
        self.total_score = kw.get('total_score')
        self.opinion = kw.get('opinion')
        super().__init__()
        

    def get_table_name(self):
        return 'or_review'

    def exclude_while_create(self):
        return ['score_items']

    def exclude_while_update(self):
        return ['score_items']


class ReviewLogModel(BaseModel):
  
    id = 0
    review_id = 0
    review_contents = None
    
    def __init__(self, **kw):
        self.id = kw.get('id')
        self.review_id = kw.get('review_id')
        self.review_contents = kw.get('review_contents')
        super().__init__()
        

    def get_table_name(self):
        return 'or_review_logs'

