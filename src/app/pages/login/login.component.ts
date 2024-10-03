import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { COMMON_FORM_LIST } from 'src/app/modules';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CoreApiUrls } from 'src/app/model/api.content';
import { GenericService } from 'src/app/services/generic.service';
import { CoreService } from 'src/app/services/core.service';
import { environment } from 'src/app/enviroment';

@UntilDestroy()
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, COMMON_FORM_LIST],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup | any;
  isFormSubmitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private genericService: GenericService,
    private coreService: CoreService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      UserName: ['', [Validators.required]],
      UserPassword: ['', [Validators.required]],
    });
  }

  get entityFormConfig() {
    return this.loginForm.controls;
  }

  /**
   * On Submit
   * @returns
   */
  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.isFormSubmitted = true;
      return;
    }
    /**
     * UNCOMMENT FOR API Calling
     */
    // this.genericService
    //   .customPost(CoreApiUrls.authenticationUrls.login, this.loginForm.value)
    //   .pipe(untilDestroyed(this))
    //   .subscribe({
    //     next: (res) => {
    //       if (!res.result) {
    //         this.coreService.displayToast({
    //           type: 'error',
    //           message: res.message,
    //         });
    //         return;
    //       }
    // this.coreService.store('accessToken','accessToken');
    //       this.router.navigate(['/listing']);
    //     },
    //     error: (error) => {
    //       console.log(error);
    //     },
    //   });
    if (
      this.loginForm.value.UserName === 'Rohit' &&
      this.loginForm.value.UserPassword === 'Rohit@098'
    ) {
      this.coreService.store(
        'accessToken',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
      );
      this.router.navigate(['/listing']);
    } else {
      this.coreService.displayToast({
        type: 'error',
        message: 'Something Want Wrong!!',
      });
    }
  }
}
