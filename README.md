## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository with Clean Architecture.

A parte do clean entra dentro da src => @core
Todo o resto é uma aplicação nest padrão

Node version >= 16.20.0 (lts/fermium)

## Installation

```bash
$ npm install
```

### Instalar o dotenv-cli do python para controle de environments
```bash
$ sudo apt install python3-dotenv-cli
```

### Nest common commands
```bash
$ nest g resource {nome do recurso} (Cria um controller, service e um module)
```
## Prisma Setup
```bash
No .env local precisa colocar a url do banco em questão, nesse formato abaixo
DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE"

//Vai pegar teu banco que ta conectado no .env e vai gerar o schema!! (Usar esse caso o teu banco ja esta pronto)
$ npx prisma db pull 

//Vai pegar teu schema e vai fazer levar pro teu banco conectado!! (Usar esse caso teu banco esta sendo moldado pelo prisma)
$ npx prisma db push

//Vai gerar o teu cliente prisma para o projeto!!(Não esquece de rodar!)
$ npx prisma generate

//Vai gerar tipo um phpMyAdmin na tua localhost:5555, bem útil pro desenvolvimento
$ npx prisma studio
```


## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

Para acessar o Swagger UI vai ser na localhost:3100/api

# production mode
$ npm run start:prod
```


```bash
# unit tests
$ npm run test

# tests ui 
$ npm run test:ui

# test coverage
$ npm run test:cov
```

