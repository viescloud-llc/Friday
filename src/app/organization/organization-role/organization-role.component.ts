import { Component, OnInit, forwardRef } from '@angular/core';
import { OrganizationHomeComponent } from '../organization-home/organization-home.component';

@Component({
  selector: 'app-organization-role',
  templateUrl: './organization-role.component.html',
  styleUrls: ['./organization-role.component.scss'],
  providers: [{ provide: OrganizationHomeComponent, useExisting: forwardRef(() => OrganizationRoleComponent) }],
})
export class OrganizationRoleComponent extends OrganizationHomeComponent {

}
