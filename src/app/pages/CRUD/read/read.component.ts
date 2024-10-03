import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { CoreService } from 'src/app/services/core.service';
import { GenericService } from 'src/app/services/generic.service';
import { CoreApiUrls } from 'src/app/model/api.content';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { EmployeList } from 'src/app/model';
import { COMMON_FORM_LIST } from 'src/app/modules';

@UntilDestroy()
@Component({
  selector: 'app-read',
  standalone: true,
  imports: [CommonModule, COMMON_FORM_LIST],
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css'],
})
export class ReadComponent implements OnInit {
  employeList: EmployeList[] | [] = [];
  filteredUsers: any[] = [];
  filterBy: any;

  constructor(
    private genericService: GenericService,
    public coreService: CoreService
  ) {}

  ngOnInit(): void {
    this.getList();
  }

  getList() {
    this.genericService
      .getEntityDetails(CoreApiUrls.authenticationUrls.listing)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (res: any) => {
          this.employeList = res.data;
          this.employeList = [...this.employeList];
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  deleteEmp(id: number | undefined) {
    this.genericService
      .deleteEntity(CoreApiUrls.authenticationUrls.delete + `?empId=${id}`)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (res: any) => {
          console.log(res);
          if (res.result) {
            this.coreService.displayToast({
              type: 'success',
              message: 'Successfully delete !!',
            });
          } else {
            this.coreService.displayToast({
              type: 'error',
              message: 'Successfully not delete !!',
            });
          }
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  filter() {
    if (this.filterBy?.length !== 0) {
      this.employeList = [
        ...this.employeList.filter((user) =>
          user.empName.includes(this.filterBy)
        ),
      ];
    } else {
      this.getList();
    }
  }
}
