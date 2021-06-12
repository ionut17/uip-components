import { Pipe, PipeTransform } from '@angular/core';
import { Direction, SortChange } from '../models';

@Pipe({ name: 'tgridSort' })
export class TGridSortPipe<T extends { [key: string]: any }> implements PipeTransform {
  transform(value: T[], sort?: SortChange): T[] {
    if (!!sort) {
        const { columnName, direction } = sort;
        return value.sort((a,b) => {
            if (a[columnName] < b[columnName]) {
                return direction === Direction.ASC ? -1 : 1;
            }
            if (a[columnName] > b[columnName]) {
                return direction === Direction.ASC ? 1 : -1;
            }
            return 0;
        });
    } 
    return value;
  }
}
