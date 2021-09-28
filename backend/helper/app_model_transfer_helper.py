from x_py_libs.helpers.model_transfer_helper import *
import sys

from models import *

class AppModelTransferHelper(ModelTransferHelper):
    
    def __init__(self, class_name):
        self._globals = globals()
        super().__init__(class_name)
