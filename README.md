# MediConnect

API REST para gerenciamento de médicos e especialidades.

## Pré-requisitos

- Node.js
- PostgreSQL

## Como rodar o projeto

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd recuperacao-willer
```

2. Crie um arquivo `.env` na raiz do projeto:
```env
DATABASE_URL="postgresql://postgres:1234@localhost:5432/mediconnect"
```
*(Altere usuário e senha conforme seu PostgreSQL)*

3. Instale as dependências:
```bash
npm install
```

4. Execute as migrations e inicie o servidor:
```bash
npx prisma migrate dev
npm start
```

A API vai rodar em `http://localhost:3000`.

Rotas
Médicos
POST /medicos

Cadastra um novo médico.

Body:

{
  "nome": "Dr. Carlos Eduardo",
  "crm": "54321-SP"
}
GET /medicos

Lista todos os médicos e suas especialidades vinculadas.

Body: não possui.

PUT /medicos

Atualiza os dados de um médico.

Body:

{
  "id": 1,
  "nome": "Dr. Carlos Eduardo Silva",
  "crm": "54321-SP"
}
DELETE /medicos/:id

Remove um médico pelo ID.

Exemplo:

GET http://localhost:3000/medicos/1
Especialidades
POST /especialidades

Cadastra uma nova especialidade.

Body:

{
  "nome": "Pediatria",
  "descricao": "Atendimento infantil"
}
PUT /especialidades

Atualiza os dados de uma especialidade.

Body:

{
  "id": 1,
  "nome": "Pediatria Geral",
  "descricao": "Atendimento pediátrico geral"
}
Vínculos
POST /medicos/vincular

Vincula uma especialidade a um médico.

Body:

{
  "medicoId": 1,
  "especialidadeId": 2
}
GET /medicos/:id/especialidades

Lista as especialidades de um médico específico.

Exemplo:

GET http://localhost:3000/medicos/1/especialidades
DELETE /medicos/:id/especialidades/:especialidadeId

Remove o vínculo entre um médico e uma especialidade.

Exemplo:

DELETE http://localhost:3000/medicos/1/especialidades/2
