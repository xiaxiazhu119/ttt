from enum import Enum

from config.app_config import app_config

from x_py_libs.helpers import UtilitiesHelper, CryptoHelper

class DbType(Enum):
    PostgreSQL = 'pg'
    MSSQL = 'mssql'
    MySql = 'mysql'

class AppConfigHelper(object):
  
    @staticmethod
    def get_app_config():
        return app_config

    @staticmethod
    def get_cache_config():
        return app_config.get('cache')

    @staticmethod
    def get_auth_config():
        return app_config.get('auth')

    @staticmethod
    def get_db_connection_config(db_type=DbType.MySql):
        db_type = db_type.value

        db_config = app_config.get('db')
        encrypt = db_config.get('encrypt')
        env = app_config.get('env')

        config = db_config.get('configs').get(env)

        if encrypt:
            crypto_helper = CryptoHelper()
            config = UtilitiesHelper.json_2_obj(crypto_helper.decrypt_by_aes(config))

        config = config.get(db_type)

        return config

    @staticmethod
    def get_env():
        return app_config.get('env')

    @staticmethod
    def get_connect_string(db_type=DbType.PostgreSQL):

        config = AppConfigHelper.get_db_connection_config(db_type=db_type)

        template = app_config.get('db').get('templates').get(db_type.value)
        # connect_str = ''
        connect_str = template.format(**config)
        # print('template: ', db_type,' config:', config)
        return connect_str
