import { ApplicationConfig } from '@angular/core';
import { PreloadAllModules, provideRouter, withInMemoryScrolling, withPreloading } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { HttpUrlInterceptor } from './interceptors/http-url.interceptor';
import { provideImgixLoader } from '@angular/common';
import { environment } from '../environments/environment';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HttpAuthInterceptor } from './interceptors/http-auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withPreloading(PreloadAllModules),
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled' }),
    ),
    provideClientHydration(),
    provideHttpClient(withFetch(), withInterceptors([HttpUrlInterceptor, HttpAuthInterceptor])),
    provideImgixLoader(environment.imagesUrl),
    provideAnimations(),
  ],
};
