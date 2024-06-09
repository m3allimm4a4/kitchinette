import { ApplicationConfig } from '@angular/core';
import { PreloadAllModules, provideRouter, withPreloading } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { HttpUrlInterceptor } from './interceptors/http-url.interceptor';
import { provideImgixLoader } from '@angular/common';
import { environment } from '../environments/environment';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideClientHydration(),
    provideHttpClient(withFetch(), withInterceptors([HttpUrlInterceptor])),
    provideImgixLoader(environment.imagesUrl),
    provideAnimations(),
  ],
};
