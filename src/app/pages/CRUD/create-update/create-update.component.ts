import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { COMMON_FORM_LIST } from 'src/app/modules';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GenericService } from 'src/app/services/generic.service';
import { CoreService } from 'src/app/services/core.service';
import { CoreApiUrls } from 'src/app/model';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
@UntilDestroy()
@Component({
  selector: 'app-create-update',
  standalone: true,
  imports: [CommonModule, COMMON_FORM_LIST],
  templateUrl: './create-update.component.html',
  styleUrls: ['./create-update.component.css'],
})
export class CreateUpdateComponent {
  entityId: string | number | null = null;
  implimentionForm: FormGroup | any;
  isFormSubmitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private genericService: GenericService,
    private coreService: CoreService,
    private activatedRouter: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.implimentionForm = this.formBuilder.group({
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

    if (this.router.routerState.snapshot.url.includes('update')) {
      this.activatedRouter.params.subscribe((params) => {
        this.entityId = +params['id'];
      });
      this.getEmployeDetails();
    }
  }

  get entityFormConfig() {
    return this.implimentionForm.controls;
  }

  getEmployeDetails() {
    this.genericService
      .getEntityDetails(
        CoreApiUrls.authenticationUrls.details + `?id=${this.entityId}`
      )
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (res: any) => {
          this.patchDetails(res.data);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  patchDetails(formData: any) {
    this.implimentionForm.patchValue({
      UserName: formData?.userName,
      UserPassword: formData?.password,
      fullName: formData?.empName,
      mobNo: formData?.empContactNo,
    });
  }

  /**
   * On Submit
   * @returns
   */
  onSubmit(): void {
    if (this.implimentionForm.invalid) {
      this.isFormSubmitted = true;
      return;
    }
    /**
     * UNCOMMENT FOR API Calling
     */
    // this.genericService.createEntity(
    //   CoreApiUrls.authenticationUrls.registraion,
    //   this.implimentionForm.value
    // );
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
    this.coreService.displayToast({
      type: 'success',
      message: this.entityId
        ? 'Updated Successfully !!'
        : 'Add Successfully !!',
    });
    this.router.navigate(['/listing']);
  }
}
