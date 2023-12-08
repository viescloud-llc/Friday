import { Component, Input, OnInit } from '@angular/core';
import { AuthenticatorService } from '../shared/service/Authenticator.service';
import { MatDrawer } from '@angular/material/sidenav';
import { OrganizationService } from '../shared/service/Organization.service';
import { Organization } from '../shared/model/Organization.model';
import { first } from 'rxjs';
import { MatOption } from '../shared/model/Mat.model';
import { UtilsService } from '../shared/service/Utils.service';
import { Router } from '@angular/router';

const KEY = "SelectedOrganizationId";

@Component({
  selector: 'app-side-drawer',
  templateUrl: './side-drawer.component.html',
  styleUrls: ['./side-drawer.component.scss']
})
export class SideDrawerComponent implements OnInit {

  @Input()
  matDrawer!: MatDrawer;

  organizations: Organization[] = [];
  options: MatOption[] = [];

  constructor(
    public authenticatorService: AuthenticatorService,
    public organizationService: OrganizationService,
    private router: Router
    ) { }

  ngOnInit() {
    this.updateOrganizationList();
  }

  updateOrganizationList(): void {
    this.organizationService.getAll().pipe(first()).subscribe(
      res => {
        if(UtilsService.isNotEqual(this.organizations, res)) {
          this.organizations = res;
          this.updateOrganizationOptions();
        }
      }
    )
  }

  updateOrganizationOptions(): void {
    if(!this.organizations) 
      return;
    
    let options: MatOption[] = [];
    this.organizations.forEach(e => options.push({value: e.id!, valueLabel: e.organizationProfile!.name!}))
    if(UtilsService.isNotEqual(this.options, options))
      this.options = options;

    let cacheSelectedId = UtilsService.localStorageGetItem<string>(KEY);
    if(cacheSelectedId)
      this.organizationService.selectedOrganizationId = cacheSelectedId;
  }

  selectionChange(value: any): void {
    this.organizationService.selectedOrganizationId = value;
    UtilsService.localStorageSetItem(KEY, value);
    this.router.navigate(['organization', value, 'home']);
  }
}
