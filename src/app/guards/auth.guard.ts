import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { CoreService } from '../services/core.service';

export const authGuard = () => {
  const coreService = inject(CoreService);
  const accessToken = coreService.retrieve('accessToken');
  if (accessToken) {
    return true;
  } else {
    coreService.navigateTo('/');
    return false;
  }
};

export const loginGuard = () => {
  const coreService = inject(CoreService);
  const accessToken = coreService.retrieve('accessToken');
  if (accessToken) {
    coreService.navigateTo('listing');
    return false;
  } else {
    return true;
  }
};
