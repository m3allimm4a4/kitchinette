import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from './auth.service';
import { UserRole } from '../shared/models/user.interface';

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
    private authService: AuthService,
  ) {}

  onLogin(): void {
    this.authService.login(this.email, this.password).subscribe({
      next: user => {
        if (user.roles.includes(UserRole.ADMIN)) {
          this.router.navigate(['/admin-dashboard']).then();
        } else {
          this.router.navigate(['/']).then();
        }
      },
      error: () => {
        this.showMessage = true;
      },
    });
  }
}
