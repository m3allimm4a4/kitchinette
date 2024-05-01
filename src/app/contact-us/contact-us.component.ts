import { Component } from '@angular/core';
import { BreadcrumbsComponent } from '../shared/components/breadcrumbs/breadcrumbs.component';
import { ContactUsFormComponent } from './contact-us-form/contact-us-form.component';
import { ContactUsInfoComponent } from './contact-us-info/contact-us-info.component';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss'],
  standalone: true,
  imports: [BreadcrumbsComponent, ContactUsFormComponent, ContactUsInfoComponent],
})
export class ContactUsComponent {}
