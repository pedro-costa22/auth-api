import { z } from "zod";

const UserValidation = z.object({
  name: z.string({
    required_error: "É necessário informar um nome de usuário",
    invalid_type_error: "O campo nome precisa ser um texto válido",
  }),
  email: z.string().email({ message: "Endereço de e-mail inválido" }),
  password: z.string().min(4, { message: "A senha é inválida. Deve ter pelo menos 4 caracteres." }),
  birthDate: z.string({
    required_error: "A data de nascimento é obrigatória",
    invalid_type_error: "A data de nascimento deve ser uma string",
  }),
});

type Usuario = z.infer<typeof UserValidation>;

export default UserValidation;
