import { ChangeDetectionStrategy } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 't-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TColumnComponent<T> implements OnInit {
  @Input() name: string = '';
  @Input() property!: keyof T;
  @Input() sortable: boolean = false;

  constructor() {}

  ngOnInit(): void {}
}
