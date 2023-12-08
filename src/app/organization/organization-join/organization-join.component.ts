import { Component, OnInit } from '@angular/core';
import { OrganizationService } from 'src/app/shared/service/Organization.service';

@Component({
  selector: 'app-organization-join',
  templateUrl: './organization-join.component.html',
  styleUrls: ['./organization-join.component.scss']
})
export class OrganizationJoinComponent implements OnInit {

  organizationId: string = '';
  message: string = '';

  validForm: boolean = false;

  constructor(
    private organizationService: OrganizationService
  ) { }

  ngOnInit() {
  }

}
