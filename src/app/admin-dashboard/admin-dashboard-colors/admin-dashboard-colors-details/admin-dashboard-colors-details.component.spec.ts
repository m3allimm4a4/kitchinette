import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDashboardColorsDetailsComponent } from './admin-dashboard-colors-details.component';

describe('AdminDashboardColorsDetailsComponent', () => {
  let component: AdminDashboardColorsDetailsComponent;
  let fixture: ComponentFixture<AdminDashboardColorsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminDashboardColorsDetailsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminDashboardColorsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
