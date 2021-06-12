import { Component, OnInit, ViewChild } from '@angular/core';
import { TGridComponent } from '../grid/grid.component';

@Component({
  selector: 't-datagrid-test',
  templateUrl: './datagrid-test.component.html'
})
export class TDatagridTestComponent implements OnInit {

  @ViewChild(TGridComponent) grid?: TGridComponent<any>;

  constructor() { }

  ngOnInit(): void {
  }

}
