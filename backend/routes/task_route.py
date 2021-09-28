
from handlers import *


task_routes = []
task_routes.append((r"/task/(?P<id>[0-9]+)", TaskCRUDHandler))
task_routes.append((r"/task/list", TaskListHandler))
