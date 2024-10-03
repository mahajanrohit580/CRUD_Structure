import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

export const COMMON_FORM_LIST = [
  RouterModule,
  ReactiveFormsModule,
  FormsModule,
] as const;
