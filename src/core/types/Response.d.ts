import { IFormateError } from "./Validation";

export interface IResponse {
  error: boolean;
  statusCode: number;
  errorsFields?: IFormateError;
  message?: string;
  user?: {}
}