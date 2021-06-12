import { Pipe, PipeTransform } from '@angular/core';
import { SortChange } from '../models';

@Pipe({ name: 'tgridPaginate' })
export class TGridPaginatePipe<T extends { [key: string]: any }> implements PipeTransform {
  transform(value: T[], page: number, pageSize: number | null, sort?: SortChange): T[] {
    if (pageSize === null) {
      return value;
    }
    const start = page * pageSize;
    return value.slice(start, start + pageSize);
  }
}
