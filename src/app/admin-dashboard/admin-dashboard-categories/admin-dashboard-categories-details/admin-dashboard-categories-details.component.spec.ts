import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDashboardCategoriesDetailsComponent } from './admin-dashboard-categories-details.component';

describe('AdminDashboardCategoriesDetailsComponent', () => {
  let component: AdminDashboardCategoriesDetailsComponent;
  let fixture: ComponentFixture<AdminDashboardCategoriesDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminDashboardCategoriesDetailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminDashboardCategoriesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
