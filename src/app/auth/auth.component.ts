import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  standalone: true,
  imports: [FormsModule],
})
export class AuthComponent {
  public username = '';
  public password = '';
  public showMessage = false;

  constructor(private router: Router) {}

  onLogin(): void {
    if (this.username === 'admin' && this.password === 'admin') {
      this.router.navigate(['/admin-dashboard']).then();
      return;
    }
    this.showMessage = true;
  }
}
