import { Component, OnInit } from '@angular/core';
import { FixChangeDetection } from 'src/app/shared/directive/FixChangeDetection';
import { Organization, OrganizationProfile, SMTP } from 'src/app/shared/model/Organization.model';

@Component({
  selector: 'app-organization-creation',
  templateUrl: './organization-creation.component.html',
  styleUrls: ['./organization-creation.component.scss']
})
export class OrganizationCreationComponent extends FixChangeDetection implements OnInit {

  validForm: boolean = false;

  organizationProfile: OrganizationProfile = {socialMedias: []};
  smtp: SMTP = {};
  
  constructor() {
    super();
  }

  ngOnInit() {
  }

}
