import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';
import { ConfirmDialog } from 'src/app/shared/dialog/confirm-dialog/confirm-dialog.component';
import { FixChangeDetection } from 'src/app/shared/directive/FixChangeDetection';
import { Organization } from 'src/app/shared/model/Organization.model';
import { OrganizationService } from 'src/app/shared/service/Organization.service';
import { UtilsService } from 'src/app/shared/service/Utils.service';

@Component({
  selector: 'app-organization-home',
  templateUrl: './organization-home.component.html',
  styleUrls: ['./organization-home.component.scss']
})
export class OrganizationHomeComponent extends FixChangeDetection implements OnInit {

  id?: string;
  organization!: Organization;
  organizationCopy!: Organization;

  validForm: boolean = false;

  constructor(
    private organizationService: OrganizationService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private matDialog: MatDialog
  ) {
    super();
  }

  async ngOnInit() {
    let id = await UtilsService.getRouteParam(this.activatedRoute, 'id');
    this.id = id;

    if (id)
      this.init();
    else
      this.router.navigate(['/home']);
  }

  init() {
    if (this.id) {
      this.organizationService.getOrganization(this.id).pipe(first()).subscribe(
        res => {
          if (res) {
            this.organization = res;
            this.organizationCopy = structuredClone(this.organization);
          }
        }
      );
    }
  }

  validUpdate(): boolean {
    return this.validForm && this.isNotEqual();
  }

  isNotEqual(): boolean {
    return UtilsService.isNotEqual(this.organization, this.organizationCopy);
  }

  reverse(): void {
    this.organization = structuredClone(this.organizationCopy);
  }

  patchProfile(): void {
    if (!this.validUpdate())
      return;

    this.organizationService.patchOrganization(this.organization).pipe(first()).subscribe(
      res => {
        if (res) {
          this.organization = res;
          this.organizationCopy = structuredClone(this.organization);

          let dialog = this.matDialog.open(ConfirmDialog, { data: { title: 'Update Organization Profile', message: 'successfully update organization profile', no: '', yes: 'OK' } });
          dialog.afterClosed().pipe(first()).subscribe(res => { })
        }
      },
      error => {
        let dialog = this.matDialog.open(ConfirmDialog, { data: { title: 'Update Organization Profile', message: 'Fail to update organization profile, please try again later', no: '', yes: 'OK' } });
        dialog.afterClosed().pipe(first()).subscribe(res => { });
      }
    )
  }

  updateProfile(): void {
    if (!this.validUpdate())
      return;

    this.organizationService.putOrganization(this.organization).pipe(first()).subscribe(
      res => {
        if (res) {
          this.organization = res;
          this.organizationCopy = structuredClone(this.organization);

          let dialog = this.matDialog.open(ConfirmDialog, { data: { title: 'Update Organization Profile', message: 'successfully update organization profile', no: '', yes: 'OK' } });
          dialog.afterClosed().pipe(first()).subscribe(res => { })
        }
      },
      error => {
        let dialog = this.matDialog.open(ConfirmDialog, { data: { title: 'Update Organization Profile', message: 'Fail to update organization profile, please try again later', no: '', yes: 'OK' } });
        dialog.afterClosed().pipe(first()).subscribe(res => { });
      }
    )
  }
}
