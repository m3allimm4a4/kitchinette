import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from './auth.service';
import { UserRole } from '../../../api/interfaces/user.interface';
import { Location } from '@angular/common';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  standalone: true,
  imports: [FormsModule, RouterLink],
})
export class AuthComponent {
  public email = '';
  public password = '';
  public showMessage = false;

  constructor(
    private router: Router,
    private location: Location,
    private authService: AuthService,
  ) {}

  onLogin(): void {
    this.authService.login(this.email, this.password).subscribe({
      next: user => {
        if (user.roles.includes(UserRole.ADMIN)) {
          this.router.navigate(['/admin-dashboard']).then();
        } else {
          this.location.back();
        }
      },
      error: () => {
        this.showMessage = true;
      },
    });
  }
}
