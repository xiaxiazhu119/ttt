
from handlers import *


result_template_routes = []
result_template_routes.append((r"/result/template/(?P<id>[0-9]+)", ResultTemplateCRUDHandler))
result_template_routes.append((r"/result/template/list", ResultTemplateListHandler))
