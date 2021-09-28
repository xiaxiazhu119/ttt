
from handlers import *


review_routes = []
review_routes.append((r"/review/(?P<id>[0-9]+)", ReviewCRUDHandler))
review_routes.append((r"/review/list", ReviewListHandler))

# review_routes.append((r"/review/statistics", ReviewStatisticsHandler))
