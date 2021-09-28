export enum RoleEnum {
  Normal = 1,
  Expert = 10,
  Org = 20,
  Admin = 999,
  SA = 9999
}


export enum StatusEnum {
  Unread = 101,
  HaveRead = 102,
  Normal = 201,
  // Suspend = 202,
  Disabled = 203,
  // Ignored = 3,
  // Confirmed = 4,
  // Cancelled = 5,
  // Completed = 6,
  Draft = 901,
  Pending = 902,
  Passed = 903,
  Failed = 904,
  Return = 905,
  Published = 990,
  Expired = 9999
}

export enum SysDictTypeEnum {
  Field = 1
}

export enum FinanceTypeEnum {
  Bank = 1,
  AliPay = 2,
  WeChat = 3,
}

export enum LevyScopeEnum {
  Open = 1,
  Inner = 2,
  Specify = 3
}

export enum TaskModeEnum {
  Full = 1,
  Specify = 2
}

export enum ReviewModeEnum {
  Open = 1,
  Blind = 2
}

export enum FormControlEnum {
  Input = 1,
  TextArea = 2,
  Image = 3,
  Attachment = 4,
  Url = 5
}
