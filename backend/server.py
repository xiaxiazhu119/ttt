# -*- coding=utf-8 -*-
import os
import sys

import tornado.ioloop
import tornado.web
from tornado.web import StaticFileHandler

# current_path = os.path.dirname(__file__)
current_directory = os.path.dirname(os.path.abspath(__file__))
root_path = os.path.abspath(os.path.dirname(current_directory) + os.path.sep + ".")
sys.path.append(root_path)


from routes.routes import route_list

port = 8089

settings = dict(
    template_path=os.path.join(os.path.dirname(__file__), "templates"),
    static_path=os.path.join(os.path.dirname(__file__), "statics"),
    login_url='/',
    compress_response=True
)


def make_app():
    template_path = os.path.join(os.path.dirname(__file__), "templates")
    upload_path = os.path.join(os.path.dirname(__file__), "_upload")

    route_list.append((r"/attachment/(.*)", StaticFileHandler, {"path":  upload_path}))
    route_list.append((r"/(.*)", StaticFileHandler, {"path": template_path, "default_filename": "index.html"}))

    # print(route_list)
    print("Development server is running at http://127.0.0.1:%s" % port)
    print("Quit the server with Control-C")

    return tornado.web.Application(
        handlers=route_list,
        **settings,
        debug=True,
    )


if __name__ == "__main__":
    app = make_app()
    app.listen(port)
    # tornado.ioloop.IOLoop.current().start()
    
    tornado.ioloop.IOLoop.instance().start()
