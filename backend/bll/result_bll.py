
from bll.base_bll import BaseBLL
from dal import ResultDAL
from enums.app_enum import StatusEnum


class ResultBLL(BaseBLL):

    def __init__(self):
        self.dal = ResultDAL()
        super().__init__()

    def check_submitted_by_user_id(self, user_id):
        return self.dal.check_submitted_by_user_id(user_id)

    def check_reviewed_by_user_id(self, user_id, result_ids=[]):
        return self.dal.check_reviewed_by_user_id(user_id, result_ids=result_ids)
