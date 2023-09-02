import { Component, OnInit, forwardRef } from '@angular/core';
import { OrganizationHomeComponent } from '../organization-home/organization-home.component';

@Component({
  selector: 'app-organization-profile',
  templateUrl: './organization-profile.component.html',
  styleUrls: ['./organization-profile.component.scss'],
  providers: [{ provide: OrganizationHomeComponent, useExisting: forwardRef(() => OrganizationProfileComponent) }],
})
export class OrganizationProfileComponent extends OrganizationHomeComponent {

}
