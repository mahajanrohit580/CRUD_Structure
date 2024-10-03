import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GenericService } from 'src/app/services/generic.service';
import { CoreService } from 'src/app/services/core.service';
import { COMMON_FORM_LIST } from 'src/app/modules';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [CommonModule, COMMON_FORM_LIST],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent {
  registrationForm: FormGroup | any;
  isFormSubmitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private genericService: GenericService,
    private coreService: CoreService
  ) {}

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      UserName: ['', [Validators.required]],
      UserPassword: ['', [Validators.required]],
      fullName: ['', [Validators.required]],
      mobNo: [
        '',
        [
          Validators.required,
          Validators.maxLength(12),
          Validators.minLength(10),
        ],
      ],
    });
  }

  get entityFormConfig() {
    return this.registrationForm.controls;
  }

  /**
   * On Submit
   * @returns
   */
  onSubmit(): void {
    if (this.registrationForm.invalid) {
      this.isFormSubmitted = true;
      return;
    }
    /**
     * UNCOMMENT FOR API Calling
     */
    // this.genericService
    //   .createEntity(CoreApiUrls.authenticationUrls.registraion, this.registrationForm.value)
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
    //       this.router.navigate(['/']);
    //     },
    //     error: (error) => {
    //       console.log(error);
    //     },
    //   });

    this.router.navigate(['/']);
  }
}
