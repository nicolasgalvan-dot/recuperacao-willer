# MediConnect

API REST para gerenciamento de médicos e especialidades.

## Pré-requisitos

* Node.js
* PostgreSQL

## Como rodar o projeto

### 1. Clone o repositório

```bash
git clone <url-do-repositorio>
cd recuperacao-willer
```

### 2. Crie o banco de dados

Crie um banco de dados chamado `mediconnect` no PostgreSQL.

### 3. Crie o arquivo `.env`

Crie manualmente um arquivo chamado `.env` na raiz do projeto:

```env
DATABASE_URL="postgresql://postgres:1234@localhost:5432/mediconnect"
```

Altere o usuário, senha, porta ou nome do banco conforme a configuração do PostgreSQL.

### 4. Instale as dependências

```bash
npm install
```

### 5. Execute as migrations

```bash
npx prisma migrate dev
```

### 6. Inicie o servidor

```bash
npm start
```

A API ficará disponível em:

```text
http://localhost:3000
```

---

## Rotas

### Médicos

#### POST `/medicos`

Cadastra um novo médico.

**Body:**

```json
{
  "nome": "Dr. Carlos Eduardo",
  "crm": "54321-SP"
}
```

---

#### GET `/medicos`

Lista todos os médicos e suas especialidades vinculadas.

Não possui Body.

---

#### PUT `/medicos`

Atualiza os dados de um médico.

**Body:**

```json
{
  "id": 1,
  "nome": "Dr. Carlos Eduardo Silva",
  "crm": "54321-SP"
}
```

---

#### DELETE `/medicos/:id`

Remove um médico pelo ID.

**Exemplo:**

```text
DELETE http://localhost:3000/medicos/1
```

---

### Especialidades

#### POST `/especialidades`

Cadastra uma nova especialidade.

**Body:**

```json
{
  "nome": "Pediatria",
  "descricao": "Atendimento infantil"
}
```

---

#### PUT `/especialidades`

Atualiza os dados de uma especialidade.

**Body:**

```json
{
  "id": 1,
  "nome": "Pediatria Geral",
  "descricao": "Atendimento pediátrico geral"
}
```

---

### Vínculos

#### POST `/medicos/vincular`

Vincula uma especialidade existente a um médico existente.

**Body:**

```json
{
  "medicoId": 1,
  "especialidadeId": 2
}
```

---

#### GET `/medicos/:id/especialidades`

Lista as especialidades de um médico específico.

**Exemplo:**

```text
GET http://localhost:3000/medicos/1/especialidades
```

---

#### DELETE `/medicos/:id/especialidades/:especialidadeId`

Remove o vínculo entre um médico e uma especialidade.

**Exemplo:**

```text
DELETE http://localhost:3000/medicos/1/especialidades/2
```

---

## Estrutura do projeto

```text
mediconnect/
│
├── prisma/
│   ├── migrations/
│   └── schema.prisma
│
├── src/
│   ├── server.js
│   └── routes.js
│
├── .gitignore
├── info.json
├── package.json
├── package-lock.json
└── README.md
```

## Tecnologias

* Node.js
* Express
* PostgreSQL
* Prisma ORM
* JavaScript
* ES Modules
