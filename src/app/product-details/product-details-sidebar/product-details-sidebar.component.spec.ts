import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailsSidebarComponent } from './product-details-sidebar.component';

describe('ProductDetailsSidebarComponent', () => {
  let component: ProductDetailsSidebarComponent;
  let fixture: ComponentFixture<ProductDetailsSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductDetailsSidebarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductDetailsSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
