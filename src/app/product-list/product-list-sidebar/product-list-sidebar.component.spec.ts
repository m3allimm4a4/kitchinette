import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListSidebarComponent } from './product-list-sidebar.component';

describe('ProductListSidebarComponent', () => {
  let component: ProductListSidebarComponent;
  let fixture: ComponentFixture<ProductListSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductListSidebarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductListSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
