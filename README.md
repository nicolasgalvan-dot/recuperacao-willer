# MediConnect

API REST para gerenciamento de médicos e especialidades.

## Pré-requisitos

- Node.js (v18+)
- PostgreSQL

## Como rodar o projeto

1. Clone o repositório:
git clone <url-do-repositorio>
cd recuperacao-willer

2. Instale as dependências:
npm install

3. Crie o banco no PostgreSQL:
CREATE DATABASE mediconnect;

4. Crie um arquivo .env na raiz do projeto:
DATABASE_URL="postgresql://postgres:1234@localhost:5432/mediconnect"
(Substitua postgres:1234 pelo usuário e senha do seu PostgreSQL)

5. Execute as migrations e inicie o servidor:
npx prisma migrate deploy
npm start

A API vai rodar em http://localhost:3000

---

## Rotas

### Médicos

- GET /medicos — Lista todos os médicos e suas especialidades.
- POST /medicos — Cadastra um novo médico. Body: {"nome": "Carlos Eduardo", "crm": "54321-SP"}
- PUT /medicos — Atualiza um médico. Body: {"id": 1, "nome": "Carlos Eduardo Silva", "crm": "54321-SP"}
- DELETE /medicos/:id — Remove um médico pelo ID.

### Especialidades

- POST /especialidades — Cadastra uma especialidade. Body: {"nome": "Pediatria", "descricao": "Atendimento infantil"}
- PUT /especialidades — Atualiza uma especialidade. Body: {"id": 1, "nome": "Pediatria Geral", "descricao": "Atendimento de crianças e adolescentes"}

### Vínculos (Médico e Especialidade)

- POST /medicos/vincular — Vincula uma especialidade a um médico. Body: {"medicoId": 1, "especialidadeId": 2}
- GET /medicos/:id/especialidades — Retorna as especialidades de um médico específico.
- DELETE /medicos/:id/especialidades/:especialidadeId — Desvincula uma especialidade do médico.