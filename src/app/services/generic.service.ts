import {
  HttpClient,
  HttpEvent,
  HttpHeaders,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GenericService {
  constructor(private http: HttpClient) {}
  // CREATE
  createEntity<T>(
    apiEndPoint: string,
    objToCreate: T | any,
    pathParams?: Record<string, string>,
    queryParams?: Record<string, unknown>,
    isFormData: boolean = false
  ): Observable<T> {
    const url = this.interpolateUrl(apiEndPoint, pathParams, queryParams);
    const formValue = isFormData
      ? this.createFormData(objToCreate)
      : objToCreate;
    return this.http.post<T>(`${url}`, formValue, {
      params: this.getQueryParams(queryParams),
    });
  }

  /**
   * @todo make custom post method generic
   */

  customPost(api: string, data: any, options?: any): Observable<any> {
    return this.http.post(api, data, options);
  }

  // GET
  getEntityDetails<T>(
    apiEndPoint: string,
    pathParams?: Record<string, string>,
    queryParams?: Record<string, unknown>
  ): Observable<T> {
    const url = this.interpolateUrl(apiEndPoint, pathParams, queryParams);
    return this.http.get<T>(`${url}`, {
      params: this.getQueryParams(queryParams),
    });
  }

  // UPDATE
  updateEntity<T>(
    apiEndPoint: string,
    objToUpdate: T | any,
    pathParams?: Record<string, string>,
    queryParams?: Record<string, unknown>
  ): Observable<T> {
    const url = this.interpolateUrl(apiEndPoint, pathParams, queryParams);
    return this.http.put<T>(`${url}`, objToUpdate);
  }

  uploadEntityInCloudFlare<T>(
    apiEndPoint: string,
    file: File,
    pathParams?: Record<string, string>,
    queryParams?: Record<string, unknown>
  ): Observable<T> {
    const url = this.interpolateUrl(apiEndPoint, pathParams, queryParams);
    const headers = new HttpHeaders({
      'Content-Type': 'multipart/form-data',
    });
    const options = {
      headers: headers,
      processData: false,
      params: this.getQueryParams(queryParams),
    };
    return this.http.put<T>(`${url}`, file, options);
  }

  // ALREADY EXIST
  checkEntityExist(
    api: string,
    value: string,
    keyName: string,
    id?: number
  ): Observable<any> {
    let params = new HttpParams().append(keyName, value);
    if (id) {
      params = params.append('id', id);
    }

    return this.http.get<any>(api, {
      params,
    });
  }

  //DELETE
  deleteEntity<T>(
    apiEndPoint: string,
    pathParams?: Record<string, string>,
    queryParams?: Record<string, unknown>
  ): Observable<T> {
    const url = this.interpolateUrl(apiEndPoint, pathParams, queryParams);
    return this.http.delete<T>(`${url}`, {
      params: this.getQueryParams(queryParams),
    });
  }

  //upload
  upload(api: string, formData: FormData): Observable<HttpEvent<any>> {
    const req = new HttpRequest('POST', api, formData, {
      reportProgress: true,
      responseType: 'json',
    });

    return this.http.request(req);
  }

  /**
   * Create Form Data
   * @param object
   * @param form
   * @param namespace
   * @returns
   */
  createFormData(object: any, form?: FormData, namespace?: string) {
    const formData = form || new FormData();
    for (const property in object) {
      if (!object.hasOwnProperty(property) || !object[property]) {
        continue;
      }
      const formKey = namespace ? `${namespace}[${property}]` : property;
      if (object[property] instanceof Date) {
        formData.append(formKey, object[property].toISOString());
      } else if (
        typeof object[property] === 'object' &&
        !(object[property] instanceof File)
      ) {
        this.createFormData(object[property], formData, formKey);
      } else {
        formData.append(formKey, object[property]);
      }
    }
    return formData;
  }

  private getQueryParams(queryParams?: Record<string, any>) {
    let httpQueryParams = new HttpParams();
    if (queryParams) {
      for (const queryParam in queryParams) {
        httpQueryParams = httpQueryParams.append(
          queryParam,
          queryParams[queryParam]
        );
      }
    }
    return httpQueryParams;
  }

  private interpolateUrl(
    url: string,
    pathParams?: Record<string, string>,
    queryParams?: Record<string, unknown>
  ): string {
    let interpolatedStr = url;

    for (const param in pathParams) {
      if (pathParams[param]) {
        interpolatedStr = interpolatedStr.replace(
          `[${param}]`,
          pathParams[param]
        );
      }
    }

    for (const queryParam in queryParams) {
      if (queryParams[queryParam]) {
        const encodedQP = encodeURIComponent(queryParams[queryParam] as string);
        interpolatedStr = interpolatedStr.replace(
          `[${queryParam}]`,
          `${queryParam}=${encodedQP}`
        );
      }
    }
    return interpolatedStr;
  }
}
