from x_py_libs.helpers.utilities_helper import UtilitiesHelper

class BaseModel(object):
  
    def __init__(self, **kw):
        super().__init__()

    def get_table_name(self):
        class_name = UtilitiesHelper.camel_2_snake(self.__class__.__name__.replace('Model', ''))
        return 'or_' + class_name

    def get_PK(self):
        return 'id';

    def get_UQ(self):
        return 'id'

    def exclude_while_create(self):
        return []

    def exclude_while_update(self):
        return []


class BaseSearchModel(object):
    page_index = 0
    page_size = 10

    def __init__(self, **kw):
        self.page_index = kw.get('page_index')
        self.page_size = kw.get('page_size')
        super().__init__()
        
