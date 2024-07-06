import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ModalContentComponent } from '../../shared/components/modal-content/modal-content.component';
import { race } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-contact-us-form',
  templateUrl: './contact-us-form.component.html',
  styleUrls: ['./contact-us-form.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule],
})
export class ContactUsFormComponent {
  protected form = new FormGroup({
    name: new FormControl<string>('', Validators.required),
    subject: new FormControl<string>('', Validators.required),
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    phone: new FormControl<string>('', Validators.required),
    message: new FormControl<string>('', Validators.required),
  });

  constructor(
    private http: HttpClient,
    private modalService: NgbModal,
  ) {}

  protected onSubmit() {
    if (!this.form.value) {
      return;
    }
    this.http.post('/contact-us', this.form.value).subscribe(() => {
      const modalRef = this.modalService.open(ModalContentComponent);
      modalRef.componentInstance.header = 'Success';
      modalRef.componentInstance.body = 'Your message has been sent, we will come back to you as soon as possible';
      return race(modalRef.closed, modalRef.dismissed);
    });
  }
}
