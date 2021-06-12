import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  SimpleChanges,
} from '@angular/core';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { TColumnComponent } from '../column/column.component';
import { Direction, PaginationChange, SortChange } from '../models';

@Component({
  selector: 't-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TGridComponent<T extends { [key: string]: any }> {
  @Input() data: T[] | Observable<T[]> = [];
  @Input() sortable: boolean = false;
  @Input() pageSize: number | null = null;

  @Output() sortChange = new EventEmitter<SortChange>();
  @Output() paginationChange = new EventEmitter<PaginationChange>();

  @ContentChildren(TColumnComponent)
  contentColumns!: QueryList<TColumnComponent<T>>;

  public rows$: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);
  public columns: TColumnComponent<T>[] = [];
  public sort: SortChange | undefined;
  public page: number = 0;
  public pageSizeOptions: number[] = [5, 10, 20, 50, 100];

  private _subList: Subscription[] = [];

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['pageSize'] && !!this.pageSize) {
      // If custom size provided, include it in the default options
      if (!this.pageSizeOptions.includes(this.pageSize)) {
        this.pageSizeOptions = [...this.pageSizeOptions, this.pageSize].sort((a,b) => a-b);
      }
    }
    if (changes['data'] && this.data) {
      const obs: Observable<T[]> = Array.isArray(this.data) ? of(this.data) : this.data;
      obs.pipe(take(1)).subscribe((value) => this.rows$.next(value));
    }
  }

  ngAfterContentInit(): void {
    this.columns = this.contentColumns.toArray().filter((c) => !!c.property);
  }

  ngOnDestroy(): void {
    this._subList.forEach(s => s.unsubscribe());
  }

  public sortBy(col: TColumnComponent<T>) {
    if (this.sortable && col.sortable) {
      const columnName = col.property as string;
      if (this.sort?.columnName === columnName) {
        this.sort = {
          columnName: columnName,
          direction:
            this.sort?.direction === Direction.ASC
              ? Direction.DESC
              : Direction.ASC,
        };
      } else {
        this.sort = {
          columnName: columnName,
          direction: Direction.ASC,
        };
      }
      this.sortChange.emit(this.sort);
      // Apply sort on data
      this.page = 0;
    }
  }

  public pageSizeChange(newSize: string) {
    const size = Number(newSize);
    this.page = 0;
    this.pageSize = size;
    this.paginationChange.emit({
      currentPage: this.page,
      pageSize: this.pageSize
    });
  }

}
