import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TGridComponent } from './grid/grid.component';
import { TColumnComponent } from './column/column.component';
import { TPaginatorComponent } from './paginator/paginator.component';
import { TGridSortPipe } from './grid/grid-sort.pipe';
import { TGridPaginatePipe } from './grid/grid-paginate.pipe';
import { FormsModule } from '@angular/forms';
import { TDatagridTestComponent } from './datagrid-test/datagrid-test.component';

@NgModule({
  declarations: [
    TGridComponent,
    TColumnComponent,
    TPaginatorComponent,
    TGridSortPipe,
    TGridPaginatePipe,
    TDatagridTestComponent
  ],
  exports: [TGridComponent, TColumnComponent],
  imports: [CommonModule, FormsModule],
})
export class TDatagridModule {}
