export interface EmployeeCreateDTO {
  firstname: string;
  lastname: string;
  email: string;
  phonenumber: string;
  hiredate: Date | null;
  countryid?: string | null;
  salary?: string | null;
  commissionpct?: string | null;
  departmentid?: string | null;
}

export interface EmployeeUpdateDTO {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  phonenumber: string;
  hiredate: Date | null;
  countryid?: string | null;
  salary?: string | null;
  commissionpct?: string | null;
  departmentid?: string | null;
}
