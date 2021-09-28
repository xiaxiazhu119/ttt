from enum import Enum

class RoleEnum(Enum):
  Normal = 1
  Expert = 10
  Org = 20
  Admin = 999
  SA = 9999

class StatusEnum(Enum):
  Unread = 101
  HaveRead = 102
  Normal = 201
  # Suspend = 202
  Disabled = 203
  Draft = 901
  Pending = 902
  Passed = 903
  Failed = 904
  Return = 905
  Published = 990
  Expired = 9999

class FinanceTypeEnum(Enum):
  Bank = 1
  AliPay = 2
  WeChat = 3


class SysDictTypeEnum(Enum):
  Field = 1
