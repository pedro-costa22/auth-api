import { z } from "zod";

const AuthValidation = z.object({
  email: z.string({
    required_error: "É necessário informaro email",
    invalid_type_error: "O campo nome precisa ser um texto válido",
  }),
  password: z.string({
    required_error: "É necessário informar a senha",
    invalid_type_error: "O campo nome precisa ser um texto válido",
  }),

});

type Usuario = z.infer<typeof AuthValidation>;

export default AuthValidation;
