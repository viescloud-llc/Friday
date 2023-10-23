import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { ConfirmDialog } from 'src/app/shared/dialog/confirm-dialog/confirm-dialog.component';
import { FixChangeDetection } from 'src/app/shared/directive/FixChangeDetection';
import { MatList, MatType } from 'src/app/shared/model/Mat.model';
import { Organization, OrganizationProfile, SMTP } from 'src/app/shared/model/Organization.model';
import { OrganizationService } from 'src/app/shared/service/Organization.service';

@Component({
  selector: 'app-organization-creation',
  templateUrl: './organization-creation.component.html',
  styleUrls: ['./organization-creation.component.scss']
})
export class OrganizationCreationComponent extends FixChangeDetection implements OnInit {

  validForm: boolean = false;

  organizationProfile!: OrganizationProfile;
  smtp: SMTP = {};

  socialMedias!: string[];
  
  constructor(
    private organizationService: OrganizationService,
    private matDialog: MatDialog,
    private router: Router
    ) {
    super();
  }

  ngOnInit() {
    this.organizationProfile = {socialMedias: []};
    this.socialMedias = this.organizationProfile.socialMedias!;
  }

  createOrganization(): void {
    if(!this.validForm)
      return;

    let organization: Organization = {
      organizationProfile: this.organizationProfile,
      smtp: this.smtp
    }

    this.organizationService.postOrganization(organization).pipe(first()).subscribe(
      res => {
        let successDialog = this.matDialog.open(ConfirmDialog, {data: {title: 'Organization Created', message: 'A new Organization have been created\nYou will be redirected to home page', no: '', yes: 'Go to home page'}})
        successDialog.afterClosed().pipe(first()).subscribe(
          res => {},
          error => {},
          () => {this.router.navigate(["/home"])}
        )
      },
      error => {
        let failDialog = this.matDialog.open(ConfirmDialog, {data: {title: 'Error!', message: 'Server can\'t create new organization at this time\nPlease try again latter', no: '', yes: 'OK'}})
        failDialog.afterClosed().pipe(first()).subscribe(
          res => {}
        )
      }
    );
  }
}
