export interface User {
  name: string;
  lastname: string;
  username: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword?: string;
}

export interface Login {
  username: string;
  password: string;
}

export interface Error {
  name: string;
  lastname: string;
  username: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  [key: string]: string;
}

export interface ErrorLogin {
  username: string;
  password: string;
  [key: string]: string;
}

export interface Field {
  [key: string]: string;
}

export interface FieldsToValidate {
  [key: string]: ValidationType[];
}
