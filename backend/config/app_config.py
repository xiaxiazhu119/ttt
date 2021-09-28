# -*- coding=utf-8 -*-


app_config = {
    'env': 'dev',
    # 'env': 'prod',
    'mobile_code': '',
    'page_size': '10',
    'server': {
        'dev': 'windows',
        'prod': 'linux'
    },
    'auth': {
        'header': 'x-api-token',
        'secret_key': '12345678abcdefg',
        'token_expire': 24*60*60,
        'ts_range': 120
    },
    'cache': {
        'enable': False,
        'host': {
            # 'remote': '101.89.187.123',
            'prod': '192.168.0.157',
            'dev': '127.0.0.1'
        },
        'port': 6379,
        'password': 'Pi=3.1415',
        'key_prefix': 'o_r_cache_'
    },
    'validation': {
        'upload_file_size': 5*1024*1024
    },
    'sms': {
        'url': 'http://smsapi.shlll.net/api/sms/send',
        'app': 'AHMJX6FDAT',
        'key': '1W7uDxqn2ESIRruK'
    },
    'response': {
        'common': {
            'request-invalid': {
                'code': -99999999,
                'msg': 'request data invalid'
            },
            'access-denied': {
                'code': -99999998,
                'msg': 'auth invalid'
            },
            'file-upload-success': {
                'code': 90100000,
                'msg': 'file upload success'
            },
            'file-upload-failed': {
                'code': -90100000,
                'msg': 'file upload failed'
            },
        }
    },
    'db': {
        'encrypt': False,
        # 'env': 'localhost',
        'configs': {
            'dev': {
                'mysql': {
                    'host': '127.0.0.1',
                    'port': '3306',
                    'db': 'online-review',
                    'user': 'root',
                    'pwd': 'sa'
                },
            },
            'prod': {
                'mysql': {
                    'host': '127.0.0.1',
                    'port': '3306',
                    'db': 'online-review',
                    'user': 'root',
                    'pwd': 'sa'
                },
            },
        },
        'templates': {
            'pg': 'host=\'{host}\' port=\'{port}\' dbname=\'{db}\' user=\'{user}\' password=\'{pwd}\'',
            'mssql2': "DRIVER={{SQL SERVER Native Client 11.0}};SERVER={host};PORT={port};DATABASE={db};UID={user};PWD={pwd}",
            'mssql': "DRIVER={{ODBC Driver 13 for SQL Server}};SERVER={host};PORT={port};DATABASE={db};UID={user};PWD={pwd}",
            'mysql': "DRIVER={{ODBC Driver 13 for SQL Server}};SERVER={host};PORT={port};DATABASE={db};UID={user};PWD={pwd}",
        }
    }
}
