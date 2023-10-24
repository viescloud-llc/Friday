import { Component, EventEmitter, Input, OnInit, Output, forwardRef } from '@angular/core';
import { MatFormFieldComponent } from '../mat-form-field/mat-form-field.component';
import { MatList } from '../../model/Mat.model';

@Component({
  selector: 'app-mat-form-field-list-input',
  templateUrl: './mat-form-field-list-input.component.html',
  styleUrls: ['./mat-form-field-list-input.component.scss'],
  providers: [{provide: MatFormFieldComponent, useExisting: forwardRef(() => MatFormFieldListInputComponent)}],
})
export class MatFormFieldListInputComponent extends MatFormFieldComponent {

  @Input()
  override value!: any[];
  override valueCopy!: any[];

  @Output()
  override valueOutput: EventEmitter<any[]> = new EventEmitter();
  
  @Input()
  showSizeInput: boolean = true;
  
  @Input()
  maxSize: number = 10;

  listLength!: number;

  validForm: boolean = false;

  @Input()
  blankObjectType!: string;

  constructor() {
    super();
  }

  override ngOnInit() {
    super.ngOnInit();
    this.listLength = this.value.length;
    this.updateBlankObjectType();
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

    while(this.value.length < this.listLength) 
      this.value.push(this.cloneBlankObject());

    if(this.value.length > this.listLength) {
      let deleteSize = this.value.length - this.listLength
      this.value.splice(this.listLength - 1, deleteSize);
    }
    
    this.listLength = this.value.length;
  }

  addNewItem() {
    if(!this.reachMaxSize())
      this.value.push(this.cloneBlankObject());
    this.listLength = this.value.length;
  }

  clone(obj: any): any {
    return structuredClone(obj);
  }

  cloneBlankObject() {
    let clone = structuredClone(this.blankObject);
    Object.setPrototypeOf(clone, this.blankObject);
    return clone;
  }

  remove(index: number): void {
    this.value.splice(index, 1);
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }

  reachMaxSize(): boolean {
    return this.value.length >= this.maxSize;
  }

  getKeyAndValueList(obj: Object) {
    let list = [];
    for (const [key, value] of Object.entries(obj)) {
      if(!Array.isArray(value) && typeof value !== 'object')
        list.push([key, value])
    }
    return list;
  }

  updateBlankObjectType() {
    if(Array.isArray(this.blankObject))
      this.blankObjectType = 'array';
    else if(typeof this.blankObject === 'object')
      this.blankObjectType = 'object';
    else
      this.blankObject = typeof this.blankObject;
  }
}
  

