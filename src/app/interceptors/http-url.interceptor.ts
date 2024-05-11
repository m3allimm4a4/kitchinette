import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environments/environment';

export const HttpUrlInterceptor: HttpInterceptorFn = (req, next) => {
  const apiBaseUrl = environment.apiUrl;
  const modifiedRequest = req.clone({
    url: apiBaseUrl + req.url,
  });
  return next(modifiedRequest);
};
