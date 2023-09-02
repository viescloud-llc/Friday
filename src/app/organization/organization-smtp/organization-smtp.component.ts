import { Component, OnInit, forwardRef } from '@angular/core';
import { OrganizationHomeComponent } from '../organization-home/organization-home.component';

@Component({
  selector: 'app-organization-smtp',
  templateUrl: './organization-smtp.component.html',
  styleUrls: ['./organization-smtp.component.scss'],
  providers: [{ provide: OrganizationHomeComponent, useExisting: forwardRef(() => OrganizationSmtpComponent) }],
})
export class OrganizationSmtpComponent extends OrganizationHomeComponent {

}
