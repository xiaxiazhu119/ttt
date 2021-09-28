from .model_base import BaseModel


class TaskModel(BaseModel):

    id = 0
    name = None
    levy_start_date = None
    levy_end_date = None
    review_start_date = None
    review_end_date = None
    scope = None
    groups = None
    group_ids = None
    task_mode = None
    review_mode = None
    status = None
    description = None
    result_template = None

    def __init__(self, **kw):
        self.id = kw.get('id')
        self.name = kw.get('name')
        self.levy_start_date = kw.get('levy_start_date')
        self.levy_end_date = kw.get('levy_end_date')
        self.review_start_date = kw.get('review_start_date')
        self.review_end_date = kw.get('review_end_date')
        self.scope = kw.get('scope')
        self.groups = kw.get('groups')
        self.task_mode = kw.get('task_mode')
        self.review_mode = kw.get('review_mode')
        self.status = kw.get('status')
        self.description = kw.get('description')
        super().__init__()

    def get_table_name(self):
        return 'or_task'

    def exclude_while_create(self):
        return ['groups', 'group_ids', 'score_item_ids', 'result_template']

    def exclude_while_update(self):
        return ['groups', 'group_ids', 'score_item_ids', 'result_template']
