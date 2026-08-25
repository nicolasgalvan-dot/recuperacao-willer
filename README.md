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

Lista todos os médicos com suas especialidades vinculadas.

Não necessita de body.

PUT /medicos

Atualiza um médico.

Body:

{
  "id": 1,
  "nome": "Dr. Carlos Eduardo Silva",
  "crm": "54321-SP"
}
DELETE /medicos/

Remove um médico pelo ID.

URL:

http://localhost:3000/medicos/1
Especialidades
POST /especialidades

Cadastra uma nova especialidade.

Body:

{
  "nome": "Pediatria",
  "descricao": "Atendimento infantil"
}
PUT /especialidades

Atualiza uma especialidade.

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
GET /medicos//especialidades

Lista as especialidades de um médico específico.

URL:

http://localhost:3000/medicos/1/especialidades
DELETE /medicos//especialidades/

Desvincula uma especialidade de um médico.

URL:

http://localhost:3000/medicos/1/especialidades/2
