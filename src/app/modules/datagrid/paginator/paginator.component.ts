import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 't-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TPaginatorComponent {

  @Input() page: number = 0;
  @Input() pageSize: number | null = null;
  @Input() total: number = 0;

  @Output() goToPage = new EventEmitter<number>();

  public totalPages: number = 0;

  constructor() { }

  ngOnChanges(): void {
    if (!!this.total && !!this.pageSize) {
      this.totalPages = Math.ceil(this.total / this.pageSize);
    }
  }

  public next() {
    if (this.page + 1 < this.totalPages) {
      this.goToPage.emit(this.page + 1);
    }
  }

  public previous() {
    if (this.page > 0) {
      this.goToPage.emit(this.page - 1);
    }
  }

}
