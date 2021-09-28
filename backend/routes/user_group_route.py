from handlers import *

user_group_routes = []
user_group_routes.append((r"/user/group/(?P<id>[0-9]+)", UserGroupCRUDHandler))
user_group_routes.append((r"/user/group/list", UserGroupListHandler))

user_group_routes.append((r"/user/group/relation/(?P<group_id>[0-9]+)", UserGroupRelationCRUDHandler))
user_group_routes.append((r"/user/group/relation/(?P<group_id>[0-9]+)/(?P<user_id>[0-9]+)", UserGroupRelationCRUDHandler))
user_group_routes.append((r"/user/group/relation/(?P<group_id>[0-9]+)/(?P<user_id>[0-9]+)/(?P<users>[\w]+)", UserGroupRelationCRUDHandler))
user_group_routes.append((r"/user/group/relation/author/(?P<group_id>[0-9]+)/(?P<user_id>[0-9]+)/(?P<is_leader>[0-1]+)", UserGroupRelationAuthorHandler))
user_group_routes.append((r"/user/group/relation/exclude/(?P<group_id>[0-9]+)", UserGroupRelationExcludeHandler))
