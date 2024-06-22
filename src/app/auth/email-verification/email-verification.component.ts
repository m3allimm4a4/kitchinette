import { afterNextRender, Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { switchMap, take, throwError } from 'rxjs';

@Component({
  selector: 'app-email-verification',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './email-verification.component.html',
  styleUrl: './email-verification.component.scss',
})
export class EmailVerificationComponent {
  public isLoading: boolean = true;
  public verified: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
  ) {
    afterNextRender(() => {
      this.activatedRoute.paramMap
        .pipe(
          take(1),
          switchMap(params => {
            const hash = params.get('hash');
            if (!hash) {
              return throwError(() => new Error('No hash found.'));
            }
            return this.authService.verifyEmail(hash);
          }),
        )
        .subscribe({
          next: res => (this.verified = res),
          complete: () => (this.isLoading = false),
        });
    });
  }
}
