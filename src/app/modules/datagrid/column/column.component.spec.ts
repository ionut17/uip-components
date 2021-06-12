import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TColumnComponent } from './column.component';

describe('ColumnComponent', () => {
  let component: TColumnComponent<any>;
  let fixture: ComponentFixture<TColumnComponent<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TColumnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
