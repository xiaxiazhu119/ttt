
from handlers import *


common_routes = []
common_routes.append((r"/common/upload/file", FileUploadHandler))
common_routes.append((r"/common/captcha/image", ImageCaptchaHandler))
