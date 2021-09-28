# -*- coding=utf-8 -*-
from .user_route import user_routes
from .user_group_route import user_group_routes
from .organization_route import org_routes
from .task_route import task_routes
from .result_route import result_routes
from .result_template_route import result_template_routes
from .score_route import score_routes
from .sys_route import sys_routes
from .review_route import review_routes
from .common_route import common_routes


class BaseRoute(object):
    
    def __init__(self):
        super().__init__()

    @staticmethod
    def get_route_list():
        route_list = []
        route_list.extend(user_routes)
        route_list.extend(user_group_routes)
        route_list.extend(org_routes)
        route_list.extend(task_routes)
        route_list.extend(result_routes)
        route_list.extend(result_template_routes)
        route_list.extend(score_routes)
        route_list.extend(sys_routes)
        route_list.extend(review_routes)
        route_list.extend(common_routes)

        route_list = list(map(lambda route: ('/api' + route[0], route[1]), route_list))

        return route_list
