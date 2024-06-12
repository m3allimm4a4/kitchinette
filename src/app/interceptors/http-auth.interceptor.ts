import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../auth/auth.service';

export const HttpAuthInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  if (authService.isUserLoggedIn()) {
    const modifiedRequest = req.clone({
      headers: req.headers.append('authorization', `Bearer ${authService.getAccessToken()}`),
    });
    return next(modifiedRequest);
  }
  return next(req);
};
