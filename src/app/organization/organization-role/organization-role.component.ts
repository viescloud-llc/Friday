import { Component, OnInit, Type, forwardRef } from '@angular/core';
import { OrganizationHomeComponent } from '../organization-home/organization-home.component';
import { Organization, Role } from 'src/app/shared/model/Organization.model';
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
  blankObject: Role = new Role();

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
      modifyFn: async (service: OrganizationService, role: Role) => {
        return new Promise<Role>((resolve, reject) => {
          let organization = structuredClone(this.organization);
          organization.roles!.map((r: Role) => {
            if(r.id === role.id)
              return role;
            else
              return r
          });
          organization = organization as Organization;
          service.patchOrganization(organization).pipe(first()).subscribe({
              next: (res) => resolve(role),
              error: (error) => reject(error)
            })
        })
      }
    }

    let dialog = this.matDialog.open(ObjectDialog, {data: dialogData, width: '100%'})

    dialog.afterClosed().pipe(first()).subscribe(
      res => {
      }
    )
  }

  addNewRole() {
    let newRole = new Role();
    let dialogData: ObjectDialogData<Role, OrganizationService> = {
      id: 0,
      service: this.organizationService,
      blankObject: new Role(),
      getFn: async (service: OrganizationService, id: string | number) => {
        return new Promise<Role>((resolve, reject) => {
          resolve(newRole);
        })
      },
      createFn: async (service: OrganizationService, role: Role) => {
        return new Promise<Role>((resolve, reject) => {
          let organization = structuredClone(this.organization);
          organization.roles!.push(role);
          organization = organization as Organization;
          service.patchOrganization(organization).pipe(first()).subscribe({
              next: (res) => resolve(role),
              error: (error) => reject(error)
            })
        })
      }
    }

    let dialog = this.matDialog.open(ObjectDialog, {data: dialogData, width: '100%'})

    dialog.afterClosed().pipe(first()).subscribe(
      res => {
        this.matRows.push(res);
      }
    )
  }
}

