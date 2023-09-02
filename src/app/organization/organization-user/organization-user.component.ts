import { Component, OnInit, forwardRef } from '@angular/core';
import { OrganizationHomeComponent } from '../organization-home/organization-home.component';

@Component({
  selector: 'app-organization-user',
  templateUrl: './organization-user.component.html',
  styleUrls: ['./organization-user.component.scss'],
  providers: [{ provide: OrganizationHomeComponent, useExisting: forwardRef(() => OrganizationUserComponent) }],
})
export class OrganizationUserComponent extends OrganizationHomeComponent {

}
