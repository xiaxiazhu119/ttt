
from handlers import *


user_routes = []
user_routes.append((r"/user/(?P<id>[0-9]+)", UserCRUDHandler))
user_routes.append((r"/user/list", UserListHandler))

user_routes.append((r"/user/sign-in", UserSignInHandler))
user_routes.append((r"/user/sign-up", UserSignUpHandler))

user_routes.append((r"/user/finance/(?P<id>[0-9]+)", UserFinanceHandler))
# org_routes.append((r"/org/simple-list", OrganizationSimpleListHandler))

user_routes.append((r"/user/group/(?P<id>[0-9]+)", UserGroupCRUDHandler))
user_routes.append((r"/user/group/list", UserGroupListHandler))