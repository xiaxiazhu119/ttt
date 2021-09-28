
from handlers import *


sys_routes = []
sys_routes.append((r"/sys/(?P<id>[0-9]+)", SysCRUDHandler))
sys_routes.append((r"/sys/list", SysListHandler))
