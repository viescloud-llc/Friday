import { Component, OnInit, forwardRef } from '@angular/core';
import { OrganizationHomeComponent } from '../organization-home/organization-home.component';
import { MatList, MatType } from 'src/app/shared/model/Mat.model';

@Component({
  selector: 'app-organization-profile',
  templateUrl: './organization-profile.component.html',
  styleUrls: ['./organization-profile.component.scss'],
  providers: [{ provide: OrganizationHomeComponent, useExisting: forwardRef(() => OrganizationProfileComponent) }],
})
export class OrganizationProfileComponent extends OrganizationHomeComponent {
  socialMedias!: MatList<String>;

  override async ngOnInit() {
      await super.ngOnInit();
      this.socialMedias = new MatList(this.organization.organizationProfile!.socialMedias!, MatType.STRING);
  }
}
