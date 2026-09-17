import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { providePrimeNG } from 'primeng/config';

import { DidarTheme } from './core/theme/didar-theme';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),

    providePrimeNG({
      theme: {
        preset: DidarTheme,

        options: {
          darkModeSelector: '.dark',
        },
      },
    }),
  ],
};
