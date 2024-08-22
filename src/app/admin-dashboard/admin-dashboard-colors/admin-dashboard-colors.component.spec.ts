import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDashboardColorsComponent } from './admin-dashboard-colors.component';

describe('AdminDashboardColorsComponent', () => {
  let component: AdminDashboardColorsComponent;
  let fixture: ComponentFixture<AdminDashboardColorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminDashboardColorsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminDashboardColorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
