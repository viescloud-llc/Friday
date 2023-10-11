import { Component, Input, OnInit } from '@angular/core';
import { GeneralSetting } from 'src/app/shared/model/Setting.model';

@Component({
  selector: 'app-general-setting',
  templateUrl: './general-setting.component.html',
  styleUrls: ['./general-setting.component.scss']
})
export class GeneralSettingComponent implements OnInit {

  generalSetting: GeneralSetting = new GeneralSetting();

  constructor() { }

  ngOnInit() {

  }

}
