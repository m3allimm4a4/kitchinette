import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';
import { UniqueEmailValidator } from '../../shared/validators/unique-email.validator';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { race, switchMap } from 'rxjs';
import { ModalContentComponent } from '../../shared/components/modal-content/modal-content.component';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  public form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email],
      asyncValidators: [UniqueEmailValidator.create(this.http)],
    }),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
  });

  constructor(
    private router: Router,
    private http: HttpClient,
    private authService: AuthService,
    private modalService: NgbModal,
  ) {}

  public onSubmit() {
    if (this.form.invalid) {
      Object.values(this.form.controls).forEach(control => control.markAsDirty());
      return;
    }
    this.authService
      .signUp({
        _id: '',
        email: this.form.controls.email.value || '',
        password: this.form.controls.password.value || '',
        firstName: this.form.controls.firstName.value || '',
        lastName: this.form.controls.lastName.value || '',
        address: this.form.controls.address.value || '',
        phone: this.form.controls.phone.value || '',
        city: this.form.controls.city.value || '',
        roles: [],
      })
      .pipe(
        switchMap(() => {
          const modalRef = this.modalService.open(ModalContentComponent);
          modalRef.componentInstance.header = 'Email verification';
          modalRef.componentInstance.body = 'An email has been sent to verify your email address';
          return race(modalRef.closed, modalRef.dismissed);
        }),
      )
      .subscribe({
        next: () => this.router.navigate(['/']).then(),
      });
  }
}
