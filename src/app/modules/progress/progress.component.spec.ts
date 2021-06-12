import { SimpleChange } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TProgressComponent } from './progress.component';

describe('ProgressComponent', () => {
  let component: TProgressComponent;
  let fixture: ComponentFixture<TProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TProgressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should throw an error on invalid radius', () => {
    spyOn(console, 'error');
    component.radius = 10;
    component.ngOnChanges({
      radius: new SimpleChange(0, 10, false)
    });
    expect(console.error).toHaveBeenCalledTimes(1);
  })

  it('should throw an error on invalid progress', () => {
    spyOn(console, 'error');
    component.progress = -5;
    component.ngOnChanges({
      progress: new SimpleChange(0, -5, false)
    });
    expect(console.error).toHaveBeenCalledTimes(1);
  })

});
