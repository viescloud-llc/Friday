import { Component, OnInit } from '@angular/core';
import { FixChangeDetection } from 'src/app/shared/directive/FixChangeDetection';
import { OrganizationJoinRequest } from 'src/app/shared/model/Organization.model';
import { OrganizationService } from 'src/app/shared/service/Organization.service';

@Component({
  selector: 'app-organization-join',
  templateUrl: './organization-join.component.html',
  styleUrls: ['./organization-join.component.scss']
})
export class OrganizationJoinComponent extends FixChangeDetection implements OnInit {

  organizationJoinRequest!: OrganizationJoinRequest;

  validForm: boolean = false;

  constructor(
    private organizationService: OrganizationService
  ) {
    super();
  }

  ngOnInit() {
    this.organizationJoinRequest = new OrganizationJoinRequest();
  }

}
