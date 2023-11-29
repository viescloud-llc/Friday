import { Component, OnInit, forwardRef } from '@angular/core';
import { OrganizationHomeComponent } from '../organization-home/organization-home.component';
import { User } from 'src/app/shared/model/Organization.model';
import { OrganizationUserDialog, OrganizationUserDialogData } from 'src/app/shared/dialog/organization/organization-user-dialog/organization-user-dialog.component';
import { first } from 'rxjs';

@Component({
  selector: 'app-organization-user',
  templateUrl: './organization-user.component.html',
  styleUrls: ['./organization-user.component.scss'],
  providers: [{ provide: OrganizationHomeComponent, useExisting: forwardRef(() => OrganizationUserComponent) }],
})
export class OrganizationUserComponent extends OrganizationHomeComponent {
  users: User[] = [];
  blankUser: User = new User();

  override async ngOnInit() {
    await super.ngOnInit();
    this.users = this.organization.users!;
  }

  onEditRow(user: User) {
    let dialogData: OrganizationUserDialogData = {
      user: user,
      organization: this.organization
    }
    let dialog = this.matDialog.open(OrganizationUserDialog, {data: dialogData, width: '100%'});

    dialog.afterClosed().pipe(first()).subscribe(
      res => {
        if(res) {

        }
      }
    );
  }
}
