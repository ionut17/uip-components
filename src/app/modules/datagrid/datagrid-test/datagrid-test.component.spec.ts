import { SimpleChange } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, timer } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { TColumnComponent } from '../column/column.component';
import { TGridPaginatePipe } from '../grid/grid-paginate.pipe';
import { TGridSortPipe } from '../grid/grid-sort.pipe';
import { TGridComponent } from '../grid/grid.component';
import { Direction } from '../models';
import { TPaginatorComponent } from '../paginator/paginator.component';

import { TDatagridTestComponent } from './datagrid-test.component';

const TEST_DATA = [
  { id: 1, title: 'AAA', body: 'Hello!'},
  { id: 2, title: 'Bbc', body: 'Hello!'},
  { id: 3, title: 'Cbc', body: 'Hello there!'},
  { id: 4, title: 'Dbc', body: 'Hello there!'},
  { id: 5, title: 'Ebc', body: 'Hello there!'},
  { id: 6, title: 'ZZZ', body: 'Hello there!'}
];
const TEST_OBS_DATA = timer(1000).pipe(switchMap(() => of(TEST_DATA)));

describe('GridComponent', () => {
  let component: TGridComponent<any>;
  let fixture: ComponentFixture<TDatagridTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        TGridComponent,
        TColumnComponent,
        TPaginatorComponent,
        TGridSortPipe,
        TGridPaginatePipe,
        TDatagridTestComponent
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TDatagridTestComponent);
    fixture.detectChanges();
    component = fixture.componentInstance.grid!;
    component.data = TEST_DATA;
    component.ngOnChanges({
      data: new SimpleChange([], TEST_DATA, true)
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render direct input data', () => {
    expect(component.rows$.value.length).toBe(TEST_DATA.length);
  })

  it('should render async input data', (done) => {
    component.data = TEST_OBS_DATA;
    component.ngOnChanges({
      data: new SimpleChange([], TEST_OBS_DATA, false)
    });
    TEST_OBS_DATA.subscribe(() => {
      expect(component.rows$.value.length).toBe(TEST_DATA.length);
      done();
    });
  })

  it('should get columns from template', () => {
    expect(component.columns.length).toBe(3);
  })

  it('should emit sort when configured', () => {
    const titleSortableColumn = component.columns[1];
    const bodyUnsortableColumn = component.columns[component.columns.length - 1];
    spyOn(component.sortChange, 'emit');

    component.sortable = false;
    component.sortBy(titleSortableColumn);
    expect(component.sortChange.emit).toHaveBeenCalledTimes(0);

    component.sortable = true;
    component.sortBy(titleSortableColumn);
    expect(component.sortChange.emit).toHaveBeenCalledWith({ columnName: 'title', direction: Direction.ASC });
    expect(component.sortChange.emit).toHaveBeenCalledTimes(1);

    component.sortBy(bodyUnsortableColumn);
    expect(component.sortChange.emit).toHaveBeenCalledTimes(1);
  })

  it('should change page size', () => {
    spyOn(component.paginationChange, 'emit');
    component.pageSizeChange('20');
    expect(component.paginationChange.emit).toHaveBeenCalledWith({ currentPage: 0, pageSize: 20 });
  })

});
