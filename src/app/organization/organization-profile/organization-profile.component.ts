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

  validForm: boolean = false;

  constructor(
    private organizationService: OrganizationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  async ngOnInit() {
    let id = await UtilsService.getRouteParam(this.activatedRoute, 'id');

    if(id) {
      this.organizationService.getOrganization(id).pipe(first()).subscribe(
        res => {
          this.organization = res;
        }
      );
    }
    else
      this.router.navigate(['/home']);
  }
  
}
