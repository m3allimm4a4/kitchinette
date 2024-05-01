import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiddleInnerComponent } from './middle-inner.component';

describe('MiddleInnerComponent', () => {
  let component: MiddleInnerComponent;
  let fixture: ComponentFixture<MiddleInnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MiddleInnerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MiddleInnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
