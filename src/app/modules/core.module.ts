import { ModuleWithProviders } from '@angular/core';
import { CoreService } from '../services/core.service';

export class CoreModule {
  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [CoreService],
    };
  }
}
