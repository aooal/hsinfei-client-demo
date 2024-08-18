import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

export const API_BASE_URL = 'https://localhost:7195/hsinfei';
export const Avatar_Default_URL = 'https://gsstorage11102023.blob.core.windows.net/gsstorage11102023/default-avatar.jpg';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)]
};