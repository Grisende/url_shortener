# url-shortener

API REST simples em Node.js com Express, PostgreSQL e Redis para encurtamento de URL's ainda incompleto, no momento só tem a parte de gerenciamento de usuários mas o intuito é explorar um pouco melhor a parte de cloud computing e CI/CD se eu tiver paciência.

## Tecnologias

- Node.js
- Express
- PostgreSQL
- Redis
- JWT
- Zod
- Jest

## Pré-requisitos

- Node.js 18+
- npm
- Docker e Docker Compose (opcional, para subir PostgreSQL e Redis localmente)

## Configuração

1. Clone o repositório e entre na pasta.
2. Instale as dependências:

```bash
npm install
```

3. Copie o arquivo de exemplo de ambiente:

```bash
cp .env.example .env
```

4. Ajuste as variáveis no arquivo `.env` conforme o seu ambiente.

## Executando com Docker

Para subir os serviços de banco e cache:

```bash
docker compose up -d
```

## Executando a API

Em modo desenvolvimento:

```bash
npm run dev
```

Ou em modo produção:

```bash
npm start
```

A API iniciará na porta `3000`, salvo configuração diferente via `PORT`.

## Variáveis de ambiente

As principais variáveis esperadas são:

- `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`
- `REDIS_URL`
- `JWT_SECRET`
- `PORT`

## Endpoints principais

### Health check

- `GET /health`

### Usuários

- `GET /users`
- `GET /users/:id`
- `POST /users`
- `DELETE /users/:id`

### Autenticação

- `POST /login`
- `POST /refresh`
- `POST /logout`

## Migrações

Para executar as migrações do banco:

```bash
npm run migrate -- up
```

## Testes

```bash
npm test
```

## Estrutura do projeto

```text
src/
  controllers/
  db/
  middlewares/
  repositories/
  routes/
  schemas/
  services/
tests/
migrations/
```
