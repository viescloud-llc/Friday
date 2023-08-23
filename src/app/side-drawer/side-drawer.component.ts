import { Component, Input, OnInit } from '@angular/core';
import { AuthenticatorService } from '../shared/service/Authenticator.service';
import { MatDrawer } from '@angular/material/sidenav';
import { OrganizationService } from '../shared/service/Organization.service';
import { Organization } from '../shared/model/Organization.model';
import { first } from 'rxjs';
import { MatOption } from '../shared/model/Mat.model';
import { UtilsService } from '../shared/service/Utils.service';

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
    public organizationService: OrganizationService
    ) { }

  ngOnInit() {
    this.updateOrganizationList();
  }

  updateOrganizationList(): void {
    this.organizationService.getOrganizations().pipe(first()).subscribe(
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
  }

  
}
