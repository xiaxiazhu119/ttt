
export const appConfig = {
  projName: 'online-review',
  protocol: 'http',
  docDomain: 'http://127.0.0.1:4202',
  localDomain: '//localhost:8089/',
  // localDomain: '//10.0.11.198:8088/',
  // localDomain: '//szk.shlnjy.net/',
  domain: '//10.0.11.49:8089/',
  // domain: '//10.0.11.198:8088/',
  // domain: '//127.0.0.1:8088/',
  apiPath: 'api',
  siteName: '',
  apis: {
    encryptParam: false,
    nest: false,
    customHeaders: {
      auth: 'x-api-token'
    },
    common: {
      path: '/common',
      modules: {
        test: '/test',
        upload: {
          path: '/upload',
          modules: {
            file: '/file',
            editor: '/editor'
          }
        },
        captcha: {
          path: '/captcha',
          modules: {
            image: '/image',
            sms: '/sms'
          }
        },
        // fileUpload: '/file/upload',
        // editorFileUpload: '/editor/file/upload',
        now: '/now',
        // getFile: '/file?path={path}',
        sendSMS: '/sms',
        cache: '/cache/{key}',
        dates: '/dates',
        // captcha: '/captcha',
        // imageCaptcha: '/image/captcha',
        // smsCaptcha: '/mobile/valid/code',
      }
    },
    user: {
      path: '/user',
      modules: {
        crud: '/{}',
        list: '/list',
        signIn: '/sign-in',
        signUp: '/sign-up',
        finance: {
          path: '/finance',
          modules: {
            delete: '/{}',
          }
        },
        group: {
          path: '/group',
          modules: {
            crud: '/{}',
            list: '/list',
            relation: {
              path: '/relation',
              modules: {
                crud: '/{}',
                author: '/author/{}',
                exclude: '/exclude/{}'
              }
            }
          }
        }
      }
    },
    org: {
      path: '/org',
      modules: {
        crud: '/{}',
        list: '/list',
        simpleList: '/simple-list'
      }
    },
    task: {
      path: '/task',
      modules: {
        crud: '/{}',
        list: '/list',
      }
    },
    result: {
      path: '/result',
      modules: {
        crud: '/{}',
        list: '/list',
        submitted: '/submitted/{}',
        reviewed: '/reviewed/{}',
        template: {
          path: '/template',
          modules: {
            crud: '/{}',
            list: '/list',
          }
        }
      }
    },
    review: {
      path: '/review',
      modules: {
        crud: '/{}',
        list: '/list',
        statistics: '/statistics'
      }
    },
    score: {
      path: '/score',
      modules: {
        item: {
          path: '/item',
          modules: {
            crud: '/{}',
            list: '/list',
            taskRelation: '/task-relation'
          }
        },
        template: {
          path: '/template',
          modules: {
            crud: '/{}',
            list: '/list',
          }
        }
      }
    },
    sys: {
      path: '/sys',
      modules: {
        crud: '/{}',
        list: '/list'
      }
    }
  },
  cookies: {
    prefix: '_',
    authExpires: 120,
    keys: {
      auth: '__ak_xx_yy_or',
      user: 'user',
      userProfile: 'user-profile',
      imgCaptcha: 'img-captcha',
      smsCaptcha: 'sms-captcha',
      countdown: '__c__d__',
      remember: {
        mobile: {
          key: 'remember-mobile',
          expires: 180  // day
        }
      },
    }
  },
  site: {
    homepage: {
      wwwroot: '',
      cms: 'cms/'
    },
    officeWebViewer: 'https://view.officeapps.live.com/op/view.aspx?src=',
    noImageAvailable: '/assets/imgs/no-image-available.jpg',
    // defaultPwd: 'Pi=3.1415',
    defaultPwd: '123456',
    defaultAvatar: 'https://cdn.onlinewebfonts.com/svg/img_173956.png'
  },
  mimeType: {
    images: 'image/jpeg,image/gif,image/png'
  },
  timer: {
    zero: 0,
    min: 60,
    sec: 1000,
    halfSec: 500
  },
  validation: {
    regex: {
      mobile: new RegExp('^(?:\\+?86)?1(?:3\\d{3}|5[^4\\D]\\d{2}|8\\d{3}|7(?:[235-8]\\d{2}|4(?:0\\d|1[0-2]|9\\d))|9[0-35-9]\\d{2}|66\\d{2})\\d{6}$'),
      email: new RegExp('^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$'),
      number: new RegExp('^[0-9]*$'),
      pwd: {
        e_n_6: new RegExp('^(?![^a-zA-Z]+$)(?!\\D+$).{6}'),
        e_n_8_upper: {
          exp: new RegExp('^(?![^a-z]+$)(?![^A-Z]+$)(?!\\D+$).{8}'),
          tip: '密码必须不少于8位，并包含数字及英文字母大小写。'
        }
      },
    },
    minLen: {
      imgCaptcha: 4,
      smsCaptcha: 5,
      pwd: 6
    },
    upload: {
      common: {
        maxSize: 10 * 1024 * 1024,
        allowedFileType: ['doc'],
        // allowedMimeType: ['application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
        allowedMimeType: [],
        deniedFileType: ['exe'],
        deniedMimeType: []
      }
    }
  },
  pagination: {
    defaultPageSize: 10,
    pageMaxSize: 5,
    btnDesc: {
      // previous: '&lsaquo;',
      // next: '&rsaquo;',
      // first: '&laquo;',
      // last: '&raquo;'
      previous: '‹',
      next: '›',
      first: '«',
      last: '»'
    },
    pageSizeSelection: [10, 20, 50, 100]
  },
  response: {
    iconConfig: {
      showIcon: true,
      type: 'font',
      cls: 'material-icons',
      configs: {
        error: {
          customCls: 'text-warning',
          name: 'warning'
        }
      }
    },
    RSP500: {
      code: -500,
      msg: '服务器好像有点小问题，请稍后再试',
      icon: 'sentiment_very_dissatisfied'
    },
    fileUpload: {
      F_U_0X99999: {
        code: -99999,
        msg: '文件格式好像不对哦。'
      },
      F_U_0X99998: {
        code: -99998,
        msg: '文件太大啦，换个小点的试试吧。'
      },
      other: {
        code: -99997,
        msg: '0X99999999。上传错误。'
      }
    }
  },
  scripts: [
    {
      name: 'echarts',
      src: 'https://cdn.bootcss.com/echarts/4.2.0-rc.1/echarts.min.js'
    }
  ],
  routes: {
    path: './components/',
    _default: {
      link: '/',
      path: '',
      redirectTo: 'passport/sign-in',
      // redirectTo: 'project/list',
      pathMatch: 'prefix'
    },
    modules: {
      web: {
        path: 'web',
        link: '/web',
        params: '',
        modules: {
          // positionInfo: {
          //   documentTitle: '岗位详情',
          //   link: '/position/info',
          //   path: 'position/info',
          //   params: '/:id',
          // },
        }
      },
      passport: {
        path: 'passport',
        link: '/passport/sign-in',
        params: '',
        modules: {
          signIn: {
            documentTitle: 'Sign In',
            link: '/passport/sign-in',
            path: 'sign-in',
            params: '',
          },
          signUp: {
            documentTitle: 'Sign Up',
            link: '/passport/sign-up',
            path: 'sign-up',
            params: '',
          },
          signOut: {
            documentTitle: 'Sign Out',
            link: '/passport/sign-out',
            path: 'sign-out',
            params: '',
          }
        }
      },
      console: {
        path: 'console',
        link: '/console',
        params: '',
        default: 'dashboard',
        modules: {
          dashboard: {
            id: 'app-console-dashboard',
            path: 'dashboard',
            title: 'Dashboard',
            default: 'index',
            icon: {
              provider: 'material-icons',
              action: 'dashboard',
            },
            modules: {
              index: {
                path: '',
                title: 'Dashboard',
              },
            }
          },
          organization: {
            id: 'app-console-organization',
            path: 'organization',
            title: '机构管理',
            default: 'list',
            icon: {
              provider: 'material-icons',
              action: 'account_balance',
            },
            modules: {
              list: {
                path: 'list',
                title: '机构列表',
              },
              create: {
                path: 'create',
                title: '新建机构'
              },
              update: {
                path: 'update',
                params: '/:id',
                title: '机构编辑'
              }
            }
          },
          expert: {
            id: 'app-console-expert',
            path: 'expert',
            title: '专家库管理',
            default: 'list',
            icon: {
              provider: 'material-icons',
              action: 'manage_accounts',
            },
            modules: {
              list: {
                path: 'list',
                title: '专家库管理',
              },
              create: {
                path: 'create',
                title: '新建专家'
              },
              view: {
                path: 'view',
                params: '/:id',
                title: '专家详情'
              },
              update: {
                path: 'update',
                params: '/:id',
                title: '专家编辑'
              }
            }
          },
          task: {
            id: 'app-console-task',
            path: 'task',
            title: '任务列表',
            default: 'list',
            icon: {
              provider: 'material-icons',
              action: 'event_note',
            },
            modules: {
              list: {
                path: 'list',
                title: '任务列表',
              },
              create: {
                path: 'create',
                title: '新建任务'
              },
              update: {
                path: 'update',
                params: '/:id',
                title: '任务编辑'
              },
              view: {
                path: 'view',
                params: '/:id',
                title: '任务详情'
              }
            }
          },
          group: {
            id: 'app-console-group',
            path: 'group',
            title: '专家组管理',
            default: 'list',
            icon: {
              provider: 'material-icons',
              action: 'groups',
            },
            modules: {
              list: {
                path: 'list',
                title: '专家组管理',
              },
              create: {
                path: 'create',
                title: '新建专家组'
              },
              update: {
                path: 'update',
                params: '/:id',
                title: '专家组编辑'
              }
            }
          },
          review: {
            id: 'app-console-review',
            path: 'review',
            title: '成果评审',
            default: 'list',
            icon: {
              provider: 'material-icons',
              action: 'assignment_turned_in',
            },
            modules: {
              list: {
                path: 'list',
                title: '成果评审',
              },
              create: {
                path: 'create',
                title: '新建评审'
              },
              update: {
                path: 'update',
                params: '/:id/:rid/:tid',
                title: '评审编辑'
              },
              view: {
                path: 'view',
                params: '/:id/:rid/:tid',
                title: '评审详情'
              },
              task: {
                path: 'task',
                params: '/:id',
                title: '任务详情'
              },
              statistics: {
                path: 'statistics',
                params: '/:resultId/:taskId',
                title: '评审统计'
              }
            }
          },
          share: {
            id: 'app-console-share',
            path: 'share',
            title: '平台共享',
            default: 'index',
            enabled: false,
            icon: {
              provider: 'material-icons',
              action: 'link',
            },
            modules: {
              index: {
                path: '',
                title: '平台共享',
              },
            }
          },
          invitation: {
            id: 'app-console-invitation',
            path: 'invitation',
            title: '评审邀请',
            default: 'index',
            enabled: false,
            icon: {
              provider: 'material-icons',
              action: 'group_add',
            },
            modules: {
              index: {
                path: '',
                title: '评审邀请',
              },
            }
          },
          result: {
            id: 'app-console-result',
            path: 'result',
            title: '成果管理',
            default: 'list',
            icon: {
              provider: 'material-icons',
              action: 'book',
            },
            modules: {
              list: {
                path: 'list',
                title: '成果管理',
              },
              create: {
                path: 'create',
                params: '/:id/:tid',
                title: '新建成果'
              },
              update: {
                path: 'update',
                params: '/:id',
                title: '成果编辑'
              },
              view: {
                path: 'view',
                params: '/:id',
                title: '成果详情'
              },
            }
          },
          rt: {
            id: 'app-console-rt',
            path: 'rt',
            title: '成果模板管理',
            default: 'list',
            icon: {
              provider: 'material-icons',
              action: 'dashboard_customize',
            },
            modules: {
              list: {
                path: 'list',
                title: '成果模板管理',
              },
              create: {
                path: 'create',
                title: '新建模板'
              },
              update: {
                path: 'update',
                params: '/:id',
                title: '模板编辑'
              },
              view: {
                path: 'view',
                params: '/:id',
                title: '模板详情'
              },
            }
          },
          score: {
            id: 'app-console-score',
            path: 'score',
            title: '打分管理',
            default: 'index',
            icon: {
              provider: 'material-icons',
              action: 'fact_check',
            },
            modules: {
              index: {
                path: '',
                title: '打分管理',
              },
            }
          },
          sys: {
            id: 'app-console-sys',
            path: 'sys',
            title: '系统管理',
            default: 'index',
            icon: {
              provider: 'material-icons',
              action: 'settings',
            },
            modules: {
              index: {
                path: '',
                title: '系统管理',
              },
            }
          }
        }
      }
    }
  },
  authorization: {
    normal: {
      task: ['list'],
    },
    expert: {
      review: ['list'],
      // share: ['index'],
      // invitation: ['index']
    },
    // org: {
    //   expert: ['list'],
    //   task: ['list'],
    //   result: ['list'],
    // },
    org: {
      normal: {
        result: ['list'],
      },
      admin: {
        expert: ['list'],
        task: ['list'],
        // result: ['list'],
      }
    },
    admin: {
      organization: ['list', 'create', 'update'],
      expert: ['list', 'create', 'update', 'info'],
      task: ['list', 'create', 'update'],
      group: ['list', 'create', 'update'],
      score: ['index'],
      rt: ['list', 'create', 'update'],
      sys: ['index']
    }
  }
};


