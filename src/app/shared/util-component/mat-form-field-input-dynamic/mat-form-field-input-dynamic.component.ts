import { Component, Input, forwardRef } from '@angular/core';
import { MatFormFieldComponent } from '../mat-form-field/mat-form-field.component';
import { MatFromFieldInputDynamicData, MatFromFieldInputDynamicItem, MatItemSetting, MatItemSettingType, MatOption } from '../../model/Mat.model';

@Component({
  selector: 'app-mat-form-field-input-dynamic',
  templateUrl: './mat-form-field-input-dynamic.component.html',
  styleUrls: ['./mat-form-field-input-dynamic.component.scss'],
  providers: [{ provide: MatFormFieldComponent, useExisting: forwardRef(() => MatFormFieldInputDynamicComponent) }],
})
export class MatFormFieldInputDynamicComponent extends MatFormFieldComponent {

  @Input()
  dynamicData?: MatFromFieldInputDynamicData;

  @Input()
  isPassword: boolean = false;

  @Input()
  isEmail: boolean = false;

  // mat option
  options: MatOption[] = [
    {
      value: true,
      valueLabel: "TRUE"
    },
    {
      value: false,
      valueLabel: "FALSE"
    }
  ];

  //dynamic type
  @Input()
  blankObject?: any;

  @Input()
  objectLabel?: string;

  items: MatFromFieldInputDynamicItem[] = [];

  constructor() {
    super();
  }

  override ngOnInit() {
    super.ngOnInit();
    if(!this.dynamicData)
      this.dynamicData = new MatFromFieldInputDynamicData(this.value);

    if(this.isValueObject() && this.blankObject)
      this.parseItems();
  }

  //dynamic object
  parseItems () {
    this.items = [];
    for (const [key, value] of Object.entries(this.value)) {
      this.items.push(new MatFromFieldInputDynamicItem(this.value, this.blankObject[key], key, value, this.getSetting(key)));
    }
  }

  private getSetting(key: string): MatItemSetting[] {
    let prototype = Object.getPrototypeOf(this.blankObject!);
    let settings: MatItemSetting[] = [];
    let name = key + 'Disable';
    if (Object.hasOwn(prototype, name) && !!prototype[name]) {
      settings.push(new MatItemSetting(MatItemSettingType.DISABLE));
    }

    name = key + 'Require';
    if (Object.hasOwn(prototype, name) && !!prototype[name]) {
      settings.push(new MatItemSetting(MatItemSettingType.REQUIRE));
    }

    return settings;
  }
}