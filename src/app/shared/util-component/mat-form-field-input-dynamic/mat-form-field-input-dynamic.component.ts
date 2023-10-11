import { Component, Input, forwardRef } from '@angular/core';
import { MatFormFieldComponent } from '../mat-form-field/mat-form-field.component';
import { MatFromFieldInputDynamicData, MatOption } from '../../model/Mat.model';

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

  constructor() {
    super();
  }

  override ngOnInit() {
    super.ngOnInit();
    if(!this.dynamicData)
      this.dynamicData = new MatFromFieldInputDynamicData(this.value);
  }
  
}
