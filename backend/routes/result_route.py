
from handlers import *


result_routes = []
result_routes.append((r"/result/(?P<id>[0-9]+)", ResultCRUDHandler))
result_routes.append((r"/result/list", ResultListHandler))
result_routes.append((r"/result/submitted/(?P<user_id>[0-9]+)", ResultCheckSubmittedHandler))
result_routes.append((r"/result/reviewed/(?P<user_id>[0-9]+)", ResultCheckReviewedHandler))
