import { IFormateError } from "../types/Validation";

export function formatError(errors: any): IFormateError {
  const errorMap = errors.issues.map(e => {
    return {
      field: e.path[0],
      message: e.message
    }
  });

  return [
    ...errorMap
  ]
}