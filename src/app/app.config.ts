import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { HttpUrlInterceptor } from './interceptors/http-url.interceptor';
import { provideImgixLoader } from '@angular/common';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withFetch(), withInterceptors([HttpUrlInterceptor])),
    provideImgixLoader(environment.imagesUrl),
  ],
};
