import { Component, OnInit, forwardRef } from '@angular/core';
import { OrganizationHomeComponent } from '../organization-home/organization-home.component';
import { MatList, MatType } from 'src/app/shared/model/Mat.model';
import { OrganizationProfile } from 'src/app/shared/model/Organization.model';

@Component({
  selector: 'app-organization-profile',
  templateUrl: './organization-profile.component.html',
  styleUrls: ['./organization-profile.component.scss'],
  providers: [{ provide: OrganizationHomeComponent, useExisting: forwardRef(() => OrganizationProfileComponent) }],
})
export class OrganizationProfileComponent extends OrganizationHomeComponent {
  socialMedias!: string[];
  blankObject: OrganizationProfile = new OrganizationProfile();

  override async ngOnInit() {
      await super.ngOnInit();
      this.socialMedias = this.organization.organizationProfile!.socialMedias!;
  }
}
