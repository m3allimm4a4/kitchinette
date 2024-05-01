import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup, ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { race, Subscription, switchMap } from 'rxjs';
import { CartService } from '../cart/cart.service';
import { ModalContentComponent } from '../shared/components/modal-content/modal-content.component';
import { CartItem } from '../shared/models/cart-item.interface';
import { OrderService } from './order.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
})
export class CheckoutComponent implements OnInit, OnDestroy {
  public checkoutForm = new FormGroup({
    firstName: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(100)],
    }),
    lastName: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(100)],
    }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email, Validators.maxLength(100)],
    }),
    phone: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(100)],
    }),
    city: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(100)],
    }),
    address1: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(255)],
    }),
    address2: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(255)],
    }),
    cartItems: new FormControl([] as CartItem[], {
      nonNullable: true,
      validators: [this.cartItemsValidator()],
    }),
  });

  public substotal = 0;
  public shipping = 5;
  public checkoutDisabled = false;
  public checkoutLoading = false;
  private subscription = new Subscription();

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private cartService: CartService,
    private checkoutService: OrderService,
  ) {}

  ngOnInit(): void {
    this.subscription.add(
      this.cartService.getTotalAmount$().subscribe(total => {
        this.substotal = total;
      }),
    );
    this.subscription.add(
      this.cartService.getItems$().subscribe(items => {
        this.checkoutForm.controls.cartItems.setValue(items);
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public placeOrder() {
    if (!this.checkoutForm.valid) return;

    const firstName = this.checkoutForm.controls.firstName.value;
    const lastName = this.checkoutForm.controls.lastName.value;
    const email = this.checkoutForm.controls.email.value;
    const phone = this.checkoutForm.controls.phone.value;
    const city = this.checkoutForm.controls.city.value;
    const address1 = this.checkoutForm.controls.address1.value;
    const address2 = this.checkoutForm.controls.address2.value;
    this.checkoutDisabled = true;
    this.checkoutLoading = true;
    this.checkoutService
      .placeOrder(firstName, lastName, email, phone, city, address1, address2)
      .pipe(
        switchMap(order => {
          const modalRef = this.modalService.open(ModalContentComponent);
          modalRef.componentInstance.header = 'Order Success';
          modalRef.componentInstance.body = `Order #${order.id}`;
          return race(modalRef.closed, modalRef.dismissed);
        }),
      )
      .subscribe(() => {
        this.cartService.clearCart();
        this.router.navigate(['/']);
      });
  }

  public displayInvalidFeedback(controlKey: string): boolean {
    const control = this.checkoutForm.get(controlKey);
    return (!control?.valid && control?.touched) || false;
  }

  private cartItemsValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return control.value.length ? null : { cartIsEmpty: true };
    };
  }
}
