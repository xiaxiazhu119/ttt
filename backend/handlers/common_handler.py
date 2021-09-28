# -*- coding=utf-8 -*-

from mimetypes import MimeTypes
from PIL import Image
import PIL

import json
import os
import time
import datetime
import re

from tornado.escape import json_decode
from x_py_libs.helpers.io_helper import FileMode, IOHelper

from x_py_libs.helpers import CryptoHelper, CaptchaHelper, UtilitiesHelper

from config.app_config import app_config
from handlers.handler_base import BaseHandler

def get_proj_root_path(root_path_name='backend'):
    current_path = os.path.abspath(os.path.dirname(__file__))
    root_path = current_path[:current_path.find(root_path_name)+len(root_path_name)]
    return root_path
    

class FileUploadBaseHandler(BaseHandler):

    def __init__(self, *args, **kwargs):
        self.file = None
        self.code = 1
        self.data = 1
        self.msg = '文件上传成功'
        super().__init__(*args, **kwargs)

    def post(self):
        # file = None
        # # file = self.base_request.files['file']
        self.file = self.request.files.get('file')
        try:

            if self.file is not None and len(self.file) > 0 and IOHelper.allowed_file(self.file[0].get('filename')):
                self.file = self.file[0]
                file_name, file_ext = IOHelper.get_file_name(self.file.get('filename'))
                ts = str(UtilitiesHelper.get_timestamp())
                ori_file_name = file_name + '_' + ts + '_ori' + file_ext
                file_name = file_name + '_' + ts + file_ext
                # root_path = Utils.get_proj_root_path()
                conf = app_config
                env = conf.get('env')
                root_path = '/var/www/' if conf.get('server').get(env) == 'linux' else get_proj_root_path()
                saved_path = '/_upload/' + str(self.user_id) + '/'
                saved_file_path = saved_path + file_name
                file_path = IOHelper.join_path(root_path, saved_file_path[1:])
                max_file_size = conf.get('validation').get('upload_file_size')
                # file_size = IOHelper.get_filesize(file_path, unit='B')
                file_size = 0
                if file_size > max_file_size:
                    self.code = -4
                    self.msg = '文件大小不能超过' + (max_file_size / 1024/1024) + 'M'
                else:
                    IOHelper.save_to_file(file_path, self.file.get('body'), use_ts=False, mode=FileMode.WB)
                    file_size = IOHelper.get_filesize(file_path, unit='B')
                    lmt_size = 1024*1024
                    if file_size > lmt_size:
                        try:
                            mime = MimeTypes()
                            mime_type = mime.guess_type(file_path)[0]
                            if mime_type.find('image/') != -1:
                                # print(mime_type)
                                img = Image.open(file_path)
                                size = img.size;
                                scale = 1
                                if img.width > 4000 or img.height > 4000:
                                    scale = .5
                                elif img.width > 3000 or img.height > 3000: 
                                    scale = .75

                                size = (int(img.width * scale), int(img.height * scale))

                                if scale != 1:
                                    # ori_file_path = saved_path + ori_file_name
                                    ori_file_path = IOHelper.join_path(root_path, saved_path[1:])
                                    IOHelper.copy(file_path, ori_file_path, ori_file_name)

                                img = img.resize(size, Image.ANTIALIAS)
                                img.save(file_path, quality=75)
                        except Exception as imageEx:
                            print('Compress Image Error:', imageEx)

                    self.data = {'file_path': saved_file_path}

                    if saved_path == '':
                        self.code = -2
                        self.msg = '文件上传失败'
            else:
                self.code = -3
                self.msg = '文件上传错误'
        except Exception as e:
            print('\r\r-----------------------------------------------------------------------------------------------------------\r')
            print('Time:', UtilitiesHelper.now_time(), '\r')
            print('File Upload Error:', e)
            print('\r-----------------------------------------------------------------------------------------------------------\r')
            self.code = -4
            self.msg = '文件上传服务错误'

        # code = 1
        # data = 1
        # msg = '文件上传成功'


class FileUploadHandler(FileUploadBaseHandler):

    def post(self):

        super().post()

        self.write_response_base(code=self.code, data=self.data, msg=self.msg, encrypt=False, json=0)
        


class EditorFileUploadHandler(FileUploadBaseHandler):

    def post(self):

        super().post()

        self.write_response_base(code=self.code, data=self.data, msg=self.msg, encrypt=False, json=0, ext={'key': 'link', 'value': self.data.get('file_path')})

# class StaticFileHandler(BaseHandler):

#     def initialize(self, *args, **kwargs):
#         self.need_auth = False
#         super().initialize(**kwargs)

#     def get(self, key, path):
#         content_type = ''
#         if key == StaticFileTypeEnum.Image.value:
#             content_type = 'image/jpg'

#         file_path = IOHelper.join_path(Utils.get_proj_root_path(), path)
#         self.set_header('Content-Type', content_type)
#         self.write(IOHelper.load_file(file_path, mode=FileMode.RB))



class ImageCaptchaHandler(BaseHandler):

    # def __init__(self, *args, **kwargs):
    #     super().__init__(*args, **kwargs)
    #     self.ignore_authorization = True

    def __init__(self, *args, **kwargs):
        # self.ignore_sign_in_authorization = True
        self.ignore_authorization = True
        super().__init__(*args, **kwargs)

    def get(self):
        chars, img_str = CaptchaHelper.generate(char_list=['0', '2', '3', '4', '5', '6', '8', '9'], create_noise_dots=False, create_noise_curve=False)
        # chars, img_str = CaptchaHelper.generate()
        chars = chars.upper()
        chars =  CryptoHelper.encrypt_by_md5(CryptoHelper.encrypt_by_aes(chars)).upper()
        data={
            'chars': chars,
            'img': img_str.decode('utf-8')
        }
        self.write_decrypt_response(data=data)
        