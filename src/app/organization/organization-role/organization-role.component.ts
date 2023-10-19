import { Component, OnInit, Type, forwardRef } from '@angular/core';
import { OrganizationHomeComponent } from '../organization-home/organization-home.component';
import { Role } from 'src/app/shared/model/Organization.model';
import { MatType } from 'src/app/shared/model/Mat.model';
import { ObjectDialog, ObjectDialogData } from 'src/app/shared/dialog/object-dialog/object-dialog.component';
import { OrganizationService } from 'src/app/shared/service/Organization.service';
import { first } from 'rxjs';
import { OrganizationRoleDialog } from 'src/app/shared/dialog/organization/organization-role-dialog/organization-role-dialog.component';

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
    let dialogData: ObjectDialogData<Role, OrganizationService> = {
      id: role.id!,
      service: this.organizationService,
      blankObject: new Role(),
      getFn: async (service: OrganizationService, id: string | number) => {
        return new Promise<Role>((resolve, reject) => {
          resolve(role);
        })
      },
      // createFn: async (role: Role, service: OrganizationService) => {
      //   console.log('create')
      // },
      modifyFn: async (service: OrganizationService, role: Role) => {
        return new Promise<Role>((resolve, reject) => {
          resolve(role);
        })
      }
    }
    let dialog = this.matDialog.open(ObjectDialog, {data: dialogData})

    // let dialog = this.matDialog.open(OrganizationRoleDialog, {data: {role: role, organization: this.organization}});

    dialog.afterClosed().pipe(first()).subscribe(
      res => {
      }
    )
  }
}

