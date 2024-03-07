const swaggerConfig = {
  "openapi": "3.0.1",
  "info": {
    "title": "Auth API",
    "description": "Documentation from user auth API",
    "version": process.env.API_VERSION
  },
  "basePath": "/",
  "components": {
    "securitySchemes": {
      "bearerAuth": {
        "type": "http",
        "scheme": "bearer",
        "bearerFormat": "JWT" 
      }
    }
  },
  "security": [{
    "bearerAuth": [],
  }],
  "paths": {
    ["/api/v" + process.env.API_VERSION + "/login"]: {
      "post": {
        "tags": ["Auth"],
        "summary": "Endpoint de login",
        "description": "Autenticação do usuário",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "email": {
                    "type": "string",
                  },
                  "password": {
                    "type": "string"
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Usuário autenticado com sucesso!"
          },
          "404": {
            "description": "Email e/ou senha inválido(s), não foi possível encontrar o usuário informado."
          }
        }
      }
    },

    ["/api/v" + process.env.API_VERSION + "/user/register"]: {
      "post": {
        "tags": ["Auth"],
        "summary": "Endpoint de login",
        "description": "Autenticação do usuário",
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "name": {
                    "type": "string",
                  },
                  "email": {
                    "type": "string",
                  },
                  "password": {
                    "type": "string"
                  },
                  "birthDate": {
                    "type": "string"
                  },
                  "phone": {
                    "type": "string",
                  }
                }
              }
            }
          }
        },
        "responses": {
          "201": {
            "description": "Usuario cadastrado com sucesso!"
          },
          "400": {
            "description": "Campos inválidos"
          }
        }
      }
    },

    ["/api/v" + process.env.API_VERSION + "/user"]: {
      "get": {
        "tags": ["User"],
        "security": [{"bearerAuth": []}],
        "summary": "Listagem de usuários",
        "description": "Listagem dos usuários",
        "responses": {
          "201": {
            "description": "Usuários encontrados"
          },
          "401": {
            "description": "Unauthorized"
          },
        }
      }
    },

    ["/api/v" + process.env.API_VERSION + "/user/{id}"]: {
      "get": {
        "tags": ["User"],
        "security": [{"bearerAuth": []}],
        "summary": "Obter informações de um usuário pelo ID",
        "description": "Obter informações de um usuário específico",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "ID do usuário",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Usuário encontrado com sucesso"
          },
          "401": {
            "description": "Unauthorized"
          },
          "404": {
            "description": "Usuário não encontrado"
          }
        }
      },

      "put": {
        "tags": ["User"],
        "security": [{"bearerAuth": []}],
        "summary": "Atualiza as informações de um usuário pelo ID",
        "description": "Atualiza informações de um usuário específico",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "ID do usuário",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "name": {
                    "type": "string",
                  },
                  "email": {
                    "type": "string",
                  },
                  "password": {
                    "type": "string"
                  },
                  "birthDate": {
                    "type": "string"
                  },
                  "phone": {
                    "type": "string",
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Usuário encontrado com sucesso"
          },
          "401": {
            "description": "Unauthorized"
          },
          "404": {
            "description": "Usuário não encontrado"
          }
        }
      },

      "delete": {
        "tags": ["User"],
        "security": [{"bearerAuth": []}],
        "summary": "Deleta um usuário pelo ID",
        "description": "Deleta um usuário específico pelo ID",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "description": "ID do usuário",
            "required": true,
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Usuário deletado com sucesso"
          },
          "401": {
            "description": "Unauthorized"
          },
          "404": {
            "description": "Usuário não encontrado"
          }
        }
      }
    },

    
  }
};

export default swaggerConfig;