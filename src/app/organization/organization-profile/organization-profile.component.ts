import { Component, OnInit } from '@angular/core';
import { ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { FixChangeDetection } from 'src/app/shared/directive/FixChangeDetection';
import { Organization } from 'src/app/shared/model/Organization.model';
import { OrganizationService } from 'src/app/shared/service/Organization.service';
import { UtilsService } from 'src/app/shared/service/Utils.service';

@Component({
  selector: 'app-organization-profile',
  templateUrl: './organization-profile.component.html',
  styleUrls: ['./organization-profile.component.scss']
})
export class OrganizationProfileComponent extends FixChangeDetection implements OnInit {

  organization!: Organization;

  validForm: boolean = false;

  constructor(
    private organizationService: OrganizationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    super();
  }

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
