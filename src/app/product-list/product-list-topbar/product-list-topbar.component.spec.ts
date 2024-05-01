import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListTopbarComponent } from './product-list-topbar.component';

describe('ProductListTopbarComponent', () => {
  let component: ProductListTopbarComponent;
  let fixture: ComponentFixture<ProductListTopbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductListTopbarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductListTopbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
