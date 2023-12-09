import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Organization, OrganizationJoinRequest } from '../model/Organization.model';
import { HttpClient } from '@angular/common/http';
import { SettingService } from './Setting.service';
import { UtilsService } from './Utils.service';
import { RestService } from './Rest.service';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService extends RestService<Organization> {
  
  protected override getURL(): string {
    return this.settingService.getGatewayUrl();
  }

  protected override getPrefixes(): string[] {
    return ['saturday', 'organizations'];
  }

  selectedOrganizationId?: string;

  constructor(
    httpClient: HttpClient,
    private settingService: SettingService
    ) {
    super(httpClient);
  }
}

@Injectable({
  providedIn: 'root'
})
export class OrganizationJoinRequestService extends RestService<OrganizationJoinRequest> {
  
  protected override getURL(): string {
    return this.settingService.getGatewayUrl();
  }

  protected override getPrefixes(): string[] {
    return ['saturday', 'organizationJoinRequests'];
  }

  selectedOrganizationId?: string;

  constructor(
    httpClient: HttpClient,
    private settingService: SettingService
    ) {
    super(httpClient);
  }
}
