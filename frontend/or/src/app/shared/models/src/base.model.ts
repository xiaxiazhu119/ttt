import 'reflect-metadata';

export class BaseModel {

  constructor(data?: any) {
    if (data) {
      // console.log(obj, typeof this)
      this.init(data);
    }
  }

  init(data: any): any {
    for (const prop of Object.keys(data)) {
      this[prop] = data[prop];
      // console.log(prop, data[prop], this[prop])
    }
    // console.log(this)
  }

}

// export class BaseModelWithImage extends BaseModel {
//   private readonly noImageAvailable = appConfig.site.noImageAvailable;

//   setNoImageAvailable(v: string) {
//     return v || this.noImageAvailable;
//   }

// }

export class BaseSearchModel {
  keyword?: string;
  pageIndex?: number;
  pageSize?: number;
  orderFields?: any[];
  orderMethods?: any[];
  orderBy?: any[] | string;

  constructor() {
    this.pageIndex = 0;
    this.pageSize = 10;
    this.orderFields = [];
    this.orderMethods = [];
  }
}

