import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDashboardProductsDetailsComponent } from './admin-dashboard-products-details.component';

describe('AdminDashboardProductsDetailsComponent', () => {
  let component: AdminDashboardProductsDetailsComponent;
  let fixture: ComponentFixture<AdminDashboardProductsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminDashboardProductsDetailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminDashboardProductsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
