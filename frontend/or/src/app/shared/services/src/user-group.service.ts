import { Inject, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { KeyValuePair, KeyValuePairActivated, KeyValuePairExtend, XNgLibsCryptoJsService, XNgLibsModelTransferService, XNgLibsRouteService } from 'x-ng-libs';

import { AppConfigService } from './app.config.service';

import { User, UserFinance, UserGroup, UserGroupRelation, UserGroupSearch, UserPassport, UserProfile, UserSearch, UserView } from '@app/shared/models/app.model';
import { AppCookieService } from './app-cookie.service';
import { AppAjaxService } from './app-ajax.service';
import { AppEnumService } from './app-enum.service';
import { StatusEnum } from '@app/shared/enums/app.enum';

@Injectable({
  providedIn: 'root'
})
export class UserGroupService {

  constructor(
    private routeService: XNgLibsRouteService,
    private cryptoJsService: XNgLibsCryptoJsService,
    private modelTransferService: XNgLibsModelTransferService,
    private appCookieService: AppCookieService,
    private appConfigService: AppConfigService,
    private ajaxService: AppAjaxService,
    private appEnumService: AppEnumService,
  ) {

  }

  getList(sc: UserGroupSearch, success: any): any {
    this.ajaxService.get('user.group.list', (resp: any) => {
      if (success) {
        let list: UserGroup[] = [];
        if (resp.data && resp.data.list && resp.data.list.length > 0) {
          resp.data.list.map(data => {
            if (data.leader) {
              data['leader'] = JSON.parse(data.leader);
              data['leaderName'] = data['leader'].value;
              // console.log(data)
            }
          });
          list = this.modelTransferService.toList<UserGroup>(resp.data.list, UserGroup);
        }
        success(list, resp.data.total);
      }
    }, sc)
  }

  createAndUpdate(group: UserGroup, success: any): any {
    const path = this.ajaxService.getApi('user.group.crud', group.id || 0);
    this.ajaxService.post(path, (resp: any) => {
      success(resp.code);
    }, group);
  }

  read(id: number, success: any): any {
    const path = this.ajaxService.getApi('user.group.crud', id);
    this.ajaxService.get(path, (resp: any) => {
      if (success) {

        let group = new UserGroup();
        let users: UserGroupRelation[] = [];
        if (resp && resp.data) {
          group = this.modelTransferService.toSingle<UserGroup>(resp.data.group, UserGroup);
          users = this.modelTransferService.toList<UserGroupRelation>(resp.data.users, UserGroupRelation);
        }

        success(group, users);
      }
    });
  }

  delete(id: number, success: any): any {
    const path = this.ajaxService.getApi('user.group.crud', id);
    this.ajaxService.delete(path, (resp: any) => {
      if (success) {
        success(resp.code);
      }
    });
  }

  createRelation(groupId: number, userIds: number[], success: any): any {
    const path = this.ajaxService.getApi('user.group.relation.crud', groupId);
    this.ajaxService.post(path, (resp: any) => {
      success(resp.code);
    }, {
      user_ids: userIds
    });
  }

  getRelationUsers(groupId: number, success: any): any {
    const path = this.ajaxService.getApi('user.group.relation.crud', groupId);
    this.ajaxService.get(path, (resp: any) => {
      let users: UserGroupRelation[] = [];
      if (resp && resp.data) {
        users = this.modelTransferService.toList<UserGroupRelation>(resp.data, UserGroupRelation);
      }

      success(users);
    });
  }

  switchAuthor(ugr: UserGroupRelation, success: any): any {
    const params = [ugr.groupId, ugr.userId, ugr.isLeader ? 0 : 1];
    const path = this.ajaxService.getApi('user.group.relation.author', params);
    this.ajaxService.post(path, (resp: any) => {
      success(resp.code);
    });
  }

  removeFromRelation(groupId: number, users: number | number[], success: any): any {
    // users = [27, 28];
    const params: any[] = [groupId];
    if (typeof users === 'number') {
      params.push(users);
    } else {
      if (Array.isArray(users)) {
        params.push(0);
        const a = this.cryptoJsService.encryptByAES(users.join(','));
        params.push(a);
      }
    }
    const path = this.ajaxService.getApi('user.group.relation.crud', params);
    this.ajaxService.delete(path, (resp: any) => {
      success(resp.code);
    });
  }

  getExcludeUsersById(id: number, success: any): any {
    const path = this.ajaxService.getApi('user.group.relation.exclude', id);
    this.getExcludeUsers(path, undefined, success);
  }

  // getExcludeUsersByExistUsers(users: number[], success: any): any {
  //   const path = this.ajaxService.getApi('user.group.relation.exclude', 0);
  //   this.getExcludeUsers(path, users, success);
  // }

  private getExcludeUsers(apiPath: string, data: any, success: any): any {
    this.ajaxService.get(apiPath, (resp: any) => {
      // console.log(resp)
      if (success) {

        if (resp && resp.data && resp.data.length > 0) {
          const users: KeyValuePairActivated[] = resp.data.map(data => ({
            key: data.id,
            value: data.name
          }));
          success(users);
        }

      }
    }, {
      users: data
    });
  }

}
