import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { COMMON_FORM_LIST } from 'src/app/modules';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [CommonModule, COMMON_FORM_LIST],
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css'],
})
export class ErrorComponent {}
