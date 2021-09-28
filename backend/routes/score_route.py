
from handlers import *


score_routes = []
score_routes.append((r"/score/item/(?P<id>[0-9]+)", ScoreItemCRUDHandler))
score_routes.append((r"/score/item/list", ScoreItemListHandler))
score_routes.append((r"/score/item/task-relation", ScoreItemTaskRelationHandler))

score_routes.append((r"/score/template/(?P<id>[0-9]+)", ScoreTemplateCRUDHandler))
score_routes.append((r"/score/template/list", ScoreTemplateListHandler))
