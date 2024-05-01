import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartTotalAmountComponent } from './cart-total-amount.component';

describe('CartTotalAmountComponent', () => {
  let component: CartTotalAmountComponent;
  let fixture: ComponentFixture<CartTotalAmountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CartTotalAmountComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CartTotalAmountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
