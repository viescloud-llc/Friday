import { Component, OnInit, forwardRef } from '@angular/core';
import { OrganizationHomeComponent } from '../organization-home/organization-home.component';
import { Role } from 'src/app/shared/model/Organization.model';
import { MatType } from 'src/app/shared/model/Mat.model';

@Component({
  selector: 'app-organization-role',
  templateUrl: './organization-role.component.html',
  styleUrls: ['./organization-role.component.scss'],
  providers: [{ provide: OrganizationHomeComponent, useExisting: forwardRef(() => OrganizationRoleComponent) }],
})
export class OrganizationRoleComponent extends OrganizationHomeComponent {
  matRows: Role[] = [];
  matColumns = Role.getDisplayColumns();

  override async ngOnInit() {
      await super.ngOnInit();
      this.matRows = this.organization.roles!;
  }

  onEditRow(role: Role) {
    console.log(role);
  }
}
