# MediConnect

API REST para gerenciamento de médicos e especialidades.

## Pré-requisitos

- Node.js (v18+)
- PostgreSQL

## Como rodar o projeto

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd recuperacao-willer
```

2. Crie o banco no PostgreSQL:
```sql
CREATE DATABASE mediconnect;
```

3. Crie um arquivo `.env` na raiz do projeto:
```env
DATABASE_URL="postgresql://postgres:1234@localhost:5432/mediconnect"
```
*(Substitua `postgres:1234` pelo usuário e senha do seu PostgreSQL)*

4. Instale as dependências:
```bash
npm install
```

5. Execute as migrations e inicie o servidor:
```bash
npx prisma migrate deploy
npm start
```

A API vai rodar em `http://localhost:3000`.

---

## Rotas

### Médicos

- **GET `/medicos`** — Lista todos os médicos com suas especialidades.
- **POST `/medicos`** — Cadastra um novo médico.
  ```json
  { "nome": "Dr. Carlos Eduardo", "crm": "54321-SP" }
  ```
- **PUT `/medicos`** — Atualiza os dados de um médico.
  ```json
  { "id": 1, "nome": "Dr. Carlos Eduardo Silva", "crm": "54321-SP" }
  ```
- **DELETE `/medicos/:id`** — Remove um médico pelo ID.

### Especialidades

- **POST `/especialidades`** — Cadastra uma nova especialidade.
  ```json
  { "nome": "Pediatria", "descricao": "Atendimento infantil" }
  ```
- **PUT `/especialidades`** — Atualiza os dados de uma especialidade.
  ```json
  { "id": 1, "nome": "Pediatria Geral", "descricao": "Atendimento pediátrico geral" }
  ```

### Vínculos (Médico e Especialidade)

- **POST `/medicos/vincular`** — Vincula uma especialidade a um médico.
  ```json
  { "medicoId": 1, "especialidadeId": 2 }
  ```
- **GET `/medicos/:id/especialidades`** — Lista as especialidades de um médico específico.
- **DELETE `/medicos/:id/especialidades/:especialidadeId`** — Desvincula uma especialidade de um médico.