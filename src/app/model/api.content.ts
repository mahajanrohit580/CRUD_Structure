import { environment } from '../enviroment';

export class CoreApiUrls {
  public static readonly authenticationUrls = {
    login: `${environment.WEB_BASE_URL}/api/amazon/Login`,
    listing: `${environment.WEB_BASE_URL}/api/EmployeeApp/GetAllEmployee`,
    delete: `${environment.WEB_BASE_URL}/api/EmployeeApp/DeleteEmployeeByEmpId`,
    details: `${environment.WEB_BASE_URL}/api/EmployeeApp/GetEmployeeByEmployeeId`,
  };
}
