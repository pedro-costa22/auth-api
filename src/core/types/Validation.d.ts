export interface IValidate {
  success: boolean;
  error?: {}
}

export interface IFormateError {
  [key: string]: any;
}