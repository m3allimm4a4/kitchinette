import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailsSocialLinksComponent } from './product-details-social-links.component';

describe('ProductDetailsSocialLinksComponent', () => {
  let component: ProductDetailsSocialLinksComponent;
  let fixture: ComponentFixture<ProductDetailsSocialLinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductDetailsSocialLinksComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductDetailsSocialLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
