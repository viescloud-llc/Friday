import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { Organization } from 'src/app/shared/model/Organization.model';
import { OrganizationService } from 'src/app/shared/service/Organization.service';
import { UtilsService } from 'src/app/shared/service/Utils.service';

@Component({
  selector: 'app-organization-profile',
  templateUrl: './organization-profile.component.html',
  styleUrls: ['./organization-profile.component.scss']
})
export class OrganizationProfileComponent implements OnInit {

  organization!: Organization;

  constructor(
    private organizationService: OrganizationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  async ngOnInit() {
    let id = await UtilsService.getRouteParam(this.activatedRoute, 'id');

    if(this.organizationService.selectedOrganizationId) {
      this.organizationService.getOrganization(this.organizationService.selectedOrganizationId).pipe(first()).subscribe(
        
      );
    }
    else
      this.router.navigate(['/home']);
  }
  
}
