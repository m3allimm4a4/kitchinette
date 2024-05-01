import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderShoppingListComponent } from './header-shopping-list.component';

describe('HeaderShoppingListComponent', () => {
  let component: HeaderShoppingListComponent;
  let fixture: ComponentFixture<HeaderShoppingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderShoppingListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderShoppingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
