# Motor-Shop-API

É uma API RESTful desenvolvida utilizando Node.js, Express, Prisma e PostgreSQL para gerenciar uma loja de veículos automotivos.
Esta API é utilizada em produção na aplicação [Motor-Shop](https://motor-shop-front-lac.vercel.app/), a qual pode ter seu repositório acessado neste [link](https://github.com/Group31-Motoshop-t14/motor-shop-front) .
A API permite que os usuários se cadastrem como clientes ou anunciantes, façam login na aplicação, atualizem ou excluam suas informações de perfil e visualizem a lista de veículos anunciados. Os anunciantes podem criar, atualizar e excluir seus anúncios de veículos. 

---

## Tabela de Conteúdos

- [Visão Geral](#1-visão-geral)
- [Diagrama ER](#2-diagrama-er)
- [Início Rápido](#3-início-rápido)
  - [Instalando Dependências](#31-instalando-dependências)
  - [Variáveis de Ambiente](#32-variáveis-de-ambiente)
  - [Migrations](#33-migrations)
  - [Rodando a API](#34-rodando-a-api)
- [Documentação da API](#4-documentação-da-api)
- [Estrutura da API](#5-estrutura-da-api)
  
---

## 1. Visão Geral
O projeto foi desenvolvido totalmente em typescript, utilizando o node.Js, e o framwwork escolhido para o desenvolvimento foi o express. 
Para realizar a serialização dos dados, das requisições, foi utilizado a biblioteca zod, e no que diz respeito a banco de dados a escolha foi
por utilizar um banco de dados relacional, o postgres, onde as consultas eram gerenciadas pelo o prisma. 
Para realizar o deploy do projeto foi escolhido o render para o servidor, e o supabase para o banco de dados.
Segue os links para mais informações sobre as tecnologias utilizadas:
- [NodeJS](https://nodejs.org/en/)
- [Express](https://expressjs.com/pt-br/)
- [TypeScript](https://www.typescriptlang.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Prisma](https://www.prisma.io/)
- [Zod](https://zod.dev/)

---

## 2. Diagrama ER
Diagrama ER da API definindo bem as relações entre as tabelas do banco de dados.

![Diagrama do projeto com suas relações!](https://dbdiagram.io/d/64775f24722eb7749426f100)

---

## 3. Início rapído
[ Voltar para o topo ](#documentação-da-api)

### 3.1. Instalando dependências

Clone o projeto em sua máquina e instale as dependências com o comando:

```
yarn install ou yarn
```

Utilizando npm

```
npm install
```

### 3.2. Variáveis de Ambiente
Em seguida, crie um arquivo **.env**, copiando o formato do arquivo **.env.example**:

```
cp .env.example .env
```

Configure suas variáveis de ambiente com suas credenciais do Postgres e uma nova database da sua escolha, a porta do localhost, a chave secreta para criação do hash da senha, o SMTP_USER e o SMTP_PASS para ser utilizado como e-mail que enviará a recuperação de senha, a url base do Back-End e a url base do Front-End para ser utilizada a recuperação de senha.

### 3.3. Migrations
Suba suas migrations com o comando:

```
npx prisma migrate dev
```

### 3.4. Rodando a API

Para rodar a API localmente use o comando:

```
yarn run dev
```

Segue abaixo os comandos para a build do projeto:

```
yarn run build
```

```
yarn run start
```

## 4. Documentação da API

[ Voltar para o topo ](#tabela-de-conteúdos)

Ainda em desenvolvimento.

---

## 5. Estrutura da API

[ Voltar para o topo ](#tabela-de-conteúdos)

### Índice

- [Users](#1-users)
    - POST - /user
    - GET - /user
    - GET - /user/all
    - PATCH - /user
    - DELETE - /user
    - PUT - /user
    - POST - /clients/resetPassword
    - PATCH - /user/resetPassword/:resetTokenId
- [Cars](#2-cars)
    - POST - /cars
    - GET - /cars
    - GET - /cars/user/:userId
    - GET - /cars/:carId
    - PATCH - /cars/:carId
    - DELETE - /cars/:carId
- [Comments](#2-comments)
    - POST - /comments/:carId
    - GET - /comments/:carId
- [Comments](#2-comments)
    - GET - /filters?:filterName=:filterValue (paramêtro de filtragem opcional)
 
---

## 1. **Users**
[ Voltar para a Estrutura da API ](#5-estrutura-da-api)

O objeto User é definido como:

| Campo         | Tipo     | Descrição                                       |
| --------------|----------|-------------------------------------------------|
| id            | UUID     | Identificador único do usuário                  |
| name          | string   | O nome do usuário                               |
| email         | string   | O e-mail do usuário                             |
| password      | string   | A senha de acesso do usuário                    |
| cpf           | string   | O cpf do usuário                                |
| phone         | string   | O telefone do usuário                           |
| birthDate     | DateTime | Data de nascimento do usuário                   |
| description   | string   | Descrição do usuário                            |
| isAdvertiser  | boolean  | Se o usuário é ou não anunciante                |
| createdAt     | DateTime | A data de registro do usuário                   |
| updatedAt     | DateTime | A data de atualiazação do registro do usuário   |
| isDeleted     | boolean  | Se o usuário foi deletado                       |

### Endpoints

| Método   | Rota       | Descrição                               |
|----------|------------|-----------------------------------------|
| POST     | /clients   | Criação de um cliente.                  |
| POST     |  /login | Login com um cliente.             |
| GET      | /clients/profile/ | Lista os dados do cliente logado|
| GET      | /clients/profile/:clientId  | Lista os dados do cliente logado a partir do seu id| 
| PATCH     | /clients/profile/:clientId  | Atualiza os dados de um cliente.   |
| DELETE     | /clients/profile/:clientId  | Realiza um softdelete em um usuário   |
| GET     | /clients/profile/:clientId/contacts | Lista todos os contatos cadastrados pelo cliente  |
---



## 2. **Contacts**
[ Voltar para a Estrutura da API ](#5-estrutura-da-api)

O objeto Contacts é definido como:

| Campo      | Tipo   | Descrição                                     |
| -----------|--------|-------------------------------------------------|
| id         | UUID   | Identificador único do contato                  |
| name       | string | O nome do contato.                              |
| email      | string | O e-mail do contato.                            |
| phone      | string | O telefone do contato.                          |
| createdAt  | string | A data de registro do contato                   |
| updatedAt  | string | A data de atualiazação do registro do contato   |
| deletedAt  | string | A data de deleção do registro do contato        |

### Endpoints

| Método   | Rota       | Descrição                               |
|----------|------------|-----------------------------------------|
| POST     | /contacts  | Criação de um contato.                  |
| GET      | /contacts/:contactId | Lista os dados do contato a partir do seu id| 
| PATCH     | /contacts/:contactId | Atualiza os dados de um contato.   |
| DELETE     | /contacts/:contactId | Apaga os dados de um contato|


---

## Autor

- [@Antonio Santos](https://github.com/AntonioSantosBJPE)


