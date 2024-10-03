import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UntilDestroy } from '@ngneat/until-destroy';
import { ToastrService } from 'ngx-toastr';

@UntilDestroy()
@Injectable({
  providedIn: 'root',
})
export class CoreService {
  constructor(private router: Router, private toastr: ToastrService) {}

  /**
   *To set value in to local storage
   * @param key
   * @param value
   * @returns
   */
  public store(key: string, value: any): any {
    return localStorage.setItem(key, value);
  }

  /**
   * To get value in to local storage
   * @param key
   * @returns
   */
  public retrieve(key: string): any {
    return localStorage.getItem(key);
  }

  /**
   * To Delete value in to local storage
   * @param key
   * @returns
   */
  public deleteStoreItem(key: string): any {
    return localStorage.removeItem(key);
  }

  /**
   * Navigation To
   * @param url
   * @param params
   * @param extras
   */
  navigateTo(url: string, params?: any, extras?: any) {
    if (params) {
      this.router.navigate([url, params], extras);
    } else {
      this.router.navigate([url]);
    }
  }

  /**
   * To display different types of toast message
   * @param options
   */
  displayToast(options: {
    type: string;
    message: string;
    title?: string;
    timeout?: number;
  }): void {
    switch (options.type) {
      case 'error':
        this.toastr.error(options.message, options.title, {
          timeOut: options.timeout ?? 3000,
        });
        break;
      case 'info':
        this.toastr.info(options.message, options.title, {
          timeOut: options.timeout ?? 3000,
        });
        break;
      case 'success':
        this.toastr.success(options.message, options.title, {
          timeOut: options.timeout ?? 3000,
        });
        break;
      case 'warning':
        this.toastr.warning(options.message, options.title, {
          timeOut: options.timeout ?? 3000,
        });
        break;
      default:
        this.toastr.show(options.message, options.title, {
          timeOut: options.timeout ?? 3000,
        });
    }
  }
}
