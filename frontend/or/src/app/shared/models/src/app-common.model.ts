import { StatusEnum } from '@app/shared/enums/app.enum';

export class ModulePath {
  id: number;
  module: string;
  documentTitle: string;
  pageTitle: string;
  path: string;
  autoLoaded: boolean;
  action?: any[];

  constructor() {
    this.id = -1;
    this.module = this.path = this.documentTitle = this.pageTitle = '';
    this.autoLoaded = false;
    this.action = [];
  }
}

export interface NavItem {
  id?: string;
  module?: string;
  title: string;
  // toolTipTitle?: string;
  // toolTipFullTitle?: string;
  link?: string;
  icon?: any;
  hasChild?: boolean;
  childNavList?: NavItem[];
  activated?: boolean;
  showChild?: boolean;
  href?: string;
  onClick?: (e: any) => void;
  blank?: boolean;
}

export class Common {
  id: number;
  name: string;
  parentId: number;
  collapse?: boolean;
}

export class SettingBase {
  id?: number;
  type: number;
  key: number;
  value: any;
}

export class Column {
  col: number;
  title: string;
  fields: string[] | string;
  data?: string;
}
