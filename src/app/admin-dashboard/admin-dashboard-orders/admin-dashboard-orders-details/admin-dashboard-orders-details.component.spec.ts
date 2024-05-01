import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDashboardOrdersDetailsComponent } from './admin-dashboard-orders-details.component';

describe('AdminDashboardOrdersDetailsComponent', () => {
  let component: AdminDashboardOrdersDetailsComponent;
  let fixture: ComponentFixture<AdminDashboardOrdersDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminDashboardOrdersDetailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminDashboardOrdersDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
