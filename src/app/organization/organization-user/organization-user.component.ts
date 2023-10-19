import { Component, OnInit, forwardRef } from '@angular/core';
import { OrganizationHomeComponent } from '../organization-home/organization-home.component';
import { User } from 'src/app/shared/model/Organization.model';

@Component({
  selector: 'app-organization-user',
  templateUrl: './organization-user.component.html',
  styleUrls: ['./organization-user.component.scss'],
  providers: [{ provide: OrganizationHomeComponent, useExisting: forwardRef(() => OrganizationUserComponent) }],
})
export class OrganizationUserComponent extends OrganizationHomeComponent {
  users: User[] = [];
  blankUser!: User;

  override async ngOnInit() {
    await super.ngOnInit();
    this.users = this.organization.users!;
    this.blankUser = new User();
  }
}
