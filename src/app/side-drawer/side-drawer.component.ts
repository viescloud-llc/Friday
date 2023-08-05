import { Component, Input, OnInit } from '@angular/core';
import { AuthenticatorService } from '../shared/service/Authenticator.service';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-side-drawer',
  templateUrl: './side-drawer.component.html',
  styleUrls: ['./side-drawer.component.scss']
})
export class SideDrawerComponent implements OnInit {

  @Input()
  matDrawer!: MatDrawer;

  constructor(public authenticatorService: AuthenticatorService) { }

  ngOnInit() {
    
  }

}
