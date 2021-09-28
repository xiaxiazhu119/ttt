
from bll.base_bll import BaseBLL
from dal import ResultTemplateDAL
from enums.app_enum import StatusEnum


class ResultTemplateBLL(BaseBLL):

    def __init__(self):
        self.dal = ResultTemplateDAL()
        super().__init__()

