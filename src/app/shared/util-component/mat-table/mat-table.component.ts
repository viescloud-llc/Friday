import { Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatColumn } from '../../model/Mat.model';

@Component({
  selector: 'app-mat-table',
  templateUrl: './mat-table.component.html',
  styleUrls: ['./mat-table.component.scss']
})
export class MatTableComponent implements OnInit, OnChanges {

  @Input()
  filterDisplay: number = 0;

  @Input()
  matRows: object[] = [];

  @Input()
  matColumns!: MatColumn[]

  @Input()
  pagination: number[] = [5, 10, 25, 100];

  @Input()
  displayFilter: boolean = false;

  @Input()
  displayPagination: boolean = false;

  @Output()
  onEditRow: EventEmitter<object> = new EventEmitter();

  displayedColumns: string[] = [];

  dataSource = new MatTableDataSource(this.matRows);

  filter?: string;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() { }

  ngOnInit() {
    this.init();
  }

  ngOnChanges() {
    this.init();
  }

  init() {
    if (!this.matColumns)
      this.fillColumns();

    if (this.matRows.length > 0) {
      this.displayedColumns = [];
      for (const [key, value] of Object.entries(this.matRows[0]))
        this.displayedColumns.push(key.toString())

      this.filterColumns();

      this.pagination = this.pagination.sort((a, b) => a - b);
      this.dataSource.data = this.matRows;
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }
  }

  private fillColumns() {
    if (this.matRows.length > 0) {
      this.matColumns = [];
      let index = 0;
      for (const [key, value] of Object.entries(this.matRows[0])) {
        this.matColumns.push({
          index: index,
          label: value
        })
        index++;
      }
    }
  }

  private filterColumns() {
    if (this.matColumns) {
      this.matColumns = this.matColumns.sort((a, b) => a.index - b.index);
      let newDisplayColumn: string[] = [];
      this.matColumns.forEach(e => {
        let index = e.index;
        newDisplayColumn.push(this.displayedColumns[index]);
      });
      this.displayedColumns = newDisplayColumn;
    }
  }

  private indexingRow() {
    this.matRows.forEach(e => {

    })
  }

  getValue(element: object, label: string): any {
    let matLabel = this.getColumnSetting(label);
    if (matLabel.getDisplayValueFn)
      return matLabel.getDisplayValueFn(element)

    for (const [keyT, value] of Object.entries(element)) {
      if (keyT === label)
        return value;
    }

    return "";
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  clearFilter() {
    this.dataSource.filter = '';

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editRow(row: object) {
    this.onEditRow.emit(row);
  }

  getColumnSetting(label: string): MatColumn {
    let index = 0;
    let matColumn: MatColumn;
    this.displayedColumns.forEach(e => {
      if (e === label) {
        matColumn = this.matColumns[index];
        return;
      }
      index++;
    })

    return matColumn!;
  }

  getLabel(label: string): string {
    let matColumn = this.getColumnSetting(label);
    if (matColumn.label)
      return matColumn.label;
    else
      return label;
  }
}
