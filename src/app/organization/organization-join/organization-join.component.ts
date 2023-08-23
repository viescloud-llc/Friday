import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-organization-join',
  templateUrl: './organization-join.component.html',
  styleUrls: ['./organization-join.component.scss']
})
export class OrganizationJoinComponent implements OnInit {

  organizationId: string = '';

  validForm: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
