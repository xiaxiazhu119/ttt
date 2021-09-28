
from handlers import *


org_routes = []
org_routes.append((r"/org/(?P<id>[0-9]+)", OrganizationCRUDHandler))
org_routes.append((r"/org/list", OrganizationListHandler))
org_routes.append((r"/org/simple-list", OrganizationSimpleListHandler))
