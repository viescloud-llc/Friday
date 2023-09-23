import { Component, EventEmitter, Input, OnInit, Output, forwardRef } from '@angular/core';
import { MatFormFieldComponent } from '../mat-form-field/mat-form-field.component';
import { MatList } from '../../model/Mat.model';

@Component({
  selector: 'app-mat-form-field-list-input',
  templateUrl: './mat-form-field-list-input.component.html',
  styleUrls: ['./mat-form-field-list-input.component.scss'],
  providers: [{provide: MatFormFieldComponent, useExisting: forwardRef(() => MatFormFieldListInputComponent)}],
})
export class MatFormFieldListInputComponent extends MatFormFieldComponent implements OnInit {

  @Input()
  override value!: MatList<any>;

  @Output()
  override valueOutput: EventEmitter<MatList<any>> = new EventEmitter();
  
  @Input()
  showSizeInput: boolean = true;
  
  @Input()
  maxSize: number = 10;

  listLength!: number;

  validForm: boolean = false;

  constructor() {
    super();
  }

  override ngOnInit() {
    this.listLength = this.value.size();
  }

  override isValidInput(): boolean {
    let superCheck = super.isValidInput();
    if(!superCheck)
      return superCheck;
    else
      return this.validForm;
  }

  updateListLength() {
    if(this.reachMaxSize())
      this.listLength = this.maxSize;

    while(this.value.size() < this.listLength) 
      this.value.pushEmptyItem();

    if(this.value.size() > this.listLength) {
      let deleteSize = this.value.size() - this.listLength
      this.value.getList().splice(this.listLength - 1, deleteSize);
    }
    
    this.listLength = this.value.size();
  }

  addNewItem() {
    if(!this.reachMaxSize())
      this.value.pushEmptyItem();
    this.listLength = this.value.size();
  }

  clone(obj: any): any {
    return structuredClone(obj);
  }

  remove(index: number): void {
    this.value.getList().splice(index, 1);
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }

  reachMaxSize(): boolean {
    return this.value.size() >= this.maxSize;
  }

}
