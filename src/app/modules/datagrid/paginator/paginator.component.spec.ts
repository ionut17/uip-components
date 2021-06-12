import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TPaginatorComponent } from './paginator.component';

describe('PaginatorComponent', () => {
  let component: TPaginatorComponent;
  let fixture: ComponentFixture<TPaginatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TPaginatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TPaginatorComponent);
    component = fixture.componentInstance;
    component.page = 0;
    component.pageSize = 10;
    component.total = 87;
    component.ngOnChanges();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate total pages correctly', () => {
    expect(component.totalPages).toBe(9);
  })

  it('should emit the page increase', () => {
    spyOn(component.goToPage, 'emit');
    component.next();
    expect(component.goToPage.emit).toHaveBeenCalledWith(1);
    component.page = 8;
    component.next();
    expect(component.goToPage.emit).toHaveBeenCalledTimes(1);
  })

  it('should emit the page decrease', () => {
    spyOn(component.goToPage, 'emit');
    component.previous();
    expect(component.goToPage.emit).toHaveBeenCalledTimes(0);
    component.page = 1;
    component.previous();
    expect(component.goToPage.emit).toHaveBeenCalledWith(0);
  })

});
