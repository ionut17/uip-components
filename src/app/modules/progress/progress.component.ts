import { Component, Input, OnChanges, Output, SimpleChanges, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 't-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TProgressComponent implements OnChanges {
  @Input() radius: number = 50;
  @Input() progress: number = 0;
  @Input() color: string = '#000';

  @Output() complete: EventEmitter<void> = new EventEmitter<void>();

  public strokeWidth: number = 10;
  public perimeter: number = 0;
  public containerSize: number = 0;
  public centerSize: number = 0;
  public offset: number = 0;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['radius']) {
      if (this.radius >= 50) {
        this.containerSize = 2 * this.radius + this.strokeWidth;
        this.centerSize = this.radius + this.strokeWidth / 2;
        this.perimeter = 2 * Math.PI * this.radius;
      } else {
        console.error('t-progress: Invalid radius parameter provided (value must be above 50)');
      }
    }
    if (changes['progress']) {
      if (this.progress >= 0 && this.progress <= 100) {
        this.offset = this.perimeter * (this.progress / 100);
        if (this.progress === 100) {
          this.complete.next();
        }
      }
      else {
        console.error('t-progress: Invalid progress parameter provided (value must be between 0 and 100)');
      }
    }
  }

}
