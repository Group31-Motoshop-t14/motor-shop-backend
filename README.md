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

![Diagrama do projeto com suas relações!](https://i.ibb.co/VS95973/DER-motor-shop.png "Motor-Shop-Diragrama")

---

## 3. Início Rápido

[Voltar para o topo](#motor-shop-api)

### 3.1. Instalando dependências

Clone o projeto em sua máquina e instale as dependências com o comando:

`yarn install ou yarn`

Utilizando npm

`npm install`

### 3.2. Variáveis de Ambiente

Em seguida, crie um arquivo **.env**, copiando o formato do arquivo **.env.example**:

`cp .env.example .env`

Configure suas variáveis de ambiente com suas credenciais do Postgres e uma nova database da sua escolha, a porta do localhost, a chave secreta para criação do hash da senha, o SMTP_USER e o SMTP_PASS para ser utilizado como e-mail que enviará a recuperação de senha, a url base do Back-End e a url base do Front-End para ser utilizada a recuperação de senha.

### 3.3. Migrations

Suba suas migrations com o comando:

`npx prisma migrate dev`

### 3.4. Rodando a API

Para rodar a API localmente use o comando:

`yarn run dev`

Segue abaixo os comandos para a build do projeto:

`yarn run build`

e

`yarn run start`

## 4. Documentação da API

[Voltar para o topo](#tabela-de-conteúdos)

É possivel acessar a documentação da API criada com Swagger de forma local utilizando o endpoint /api-docs/ ou pelo link ([Motor-Shop-Documentação-local](http://localhost:3000/api-docs/#/)) , lembrando que é necessário que o servidor esteja rodando de forma local, para o link funcionar.
Essa documentação descreve os recusos que a API possuí, como Endpoints, exemplos de requisição, exemplos de retorno e metodos de autenticação.
Também é possível acessar a documentação da API pelos seguintes links:

- [Contacts-Book-Documentação-em-produção]([https://contacts-book-api-6ydl.onrender.com/api-docs/](https://motor-shop-t14.onrender.com/api-docs/))

---

## 5. Estrutura da API

[Voltar para o topo](#tabela-de-conteúdos)

### Índice

- [Users](#1-users)
  - POST - /user
  - GET - /user
  - GET - /user/all
  - PATCH - /user
  - DELETE - /user
  - PUT - /user
  - POST - /user/resetPassword
  - PATCH - /user/resetPassword/:resetTokenId
- [Address](#2-address)
  - Nenhum endpoint
- [Cars](#3-cars)
  - POST - /cars
  - GET - /cars
  - GET - /cars/user/:userId
  - GET - /cars/:carId
  - PATCH - /cars/:carId
  - DELETE - /cars/:carId
- [CarImages](#4-carimages)
  - Nenhum endpoint
- [Comments](#5-comments)
  - POST - /comments/:carId
  - GET - /comments/:carId
- [Filters](#6-filters)
  - GET - /filters?:filterName=:filterValue (paramêtro de filtragem opcional)

---

## 1. **Users**

[Voltar para a Estrutura da API](#5-estrutura-da-api)

O objeto User é definido como:

| Campo        | Tipo      | Descrição                                                     |
| ------------ | --------- | ------------------------------------------------------------- |
| id           | UUID      | Identificador único do usuário                                |
| name         | String    | O nome do usuário                                             |
| email        | String    | O e-mail do usuário                                           |
| password     | String    | A senha de acesso do usuário                                  |
| cpf          | String    | O cpf do usuário                                              |
| phone        | String    | O telefone do usuário                                         |
| birthDate    | DateTime  | Data de nascimento do usuário                                 |
| description  | String    | Descrição do usuário                                          |
| isAdvertiser | Boolean   | Se o usuário é ou não anunciante                              |
| createdAt    | DateTime  | A data de registro do usuário                                 |
| updatedAt    | DateTime  | A data de atualiazação do registro do usuário                 |
| isDeleted    | Boolean   | Se o usuário foi deletado                                     |
| address      | Address   | Endereço do usuário relacionado em outra tabela               |
| car          | Cars[]    | Anúncios de carros criados por esse usuário                   |
| cars         | Comment[] | Comentários do usuário                                        |
| resetToken   | String?   | String aleatória gerada para ser feita a redefinição de senha |

### Endpoints

| Método | Rota                              | Descrição                                                   |
| ------ | --------------------------------- | ----------------------------------------------------------- |
| POST   | /user                             | Criação de um usuário                                       |
| GET    | /user                             | Lista os dados do usuário logado                            |
| GET    | /user/all                         | Lista os dados de todos os usuários                         |
| PATCH  | /user                             | Atualiza os dados do usuário logado.                        |
| DELETE | /user                             | SoftDelete no usuário logado.                               |
| PUT    | /user                             | Recupera usuário deletado.                                  |
| POST   | /user/resetPassword               | Envia e-mail de recuperação de senha do usuário             |
| PATCH  | /user/resetPassword/:resetTokenId | Atualiza senha do usuário utilizando o token de recuperação |

---

## 2. **Address**

[Voltar para a Estrutura da API](#5-estrutura-da-api)

O objeto Address é definido como:

| Campo      | Tipo    | Descrição                           |
| ---------- | ------- | ----------------------------------- |
| id         | UUID    | Identificador único do endereço     |
| zipCode    | String  | Código postal do endereço           |
| state      | String  | Estado do endereço                  |
| city       | String  | Cidade do endereço                  |
| street     | String  | Rua do endereço                     |
| number     | String  | Número do endereço                  |
| complement | String? | Complemento do endereço             |
| user       | Users   | Usuário vinculado a esse endereço   |
| userId     | String  | Id do usuário vinculado ao endereço |

---

## 3. **Cars**

[Voltar para a Estrutura da API](#5-estrutura-da-api)

O objeto Cars é definido como:

| Campo       | Tipo        | Descrição                                                                      |
| ----------- | ----------- | ------------------------------------------------------------------------------ |
| id          | String      | Identificador único do anúncio do carro                                        |
| brand       | String      | Marca do carro anunciado                                                       |
| model       | String      | Modelo do carro anunciado                                                      |
| year        | String      | Ano do carro anunciado                                                         |
| fuelType    | Fuel        | Tipo de combústivel do carro (ENUM: ETANOL, FLEX, HIBRIDO, ELETRICO) anunciado |
| mileage     | Int         | Kilometragem do carro anunciado                                                |
| color       | String      | Cor do carro anunciado                                                         |
| fipePrice   | Float       | Preço do carro anunciado na tabela fipe                                        |
| price       | Float       | Preço do carro anunciado                                                       |
| description | String      | Descrição do carro anunciado                                                   |
| createdAt   | DateTime    | Data de criação do anúncio do carro                                            |
| isPublished | Boolean     | Se o anúncio do carro está ativo                                               |
| coverImage  | String      | Imagem de capa do anúncio do carro                                             |
| user        | Users       | Usuário vinculado ao anúncio do carro                                          |
| userId      | String      | Id do usuário vinculado ao anúncio do carro                                    |
| users       | Comment[]   | Comentários deste anúncio                                                      |
| carImages   | CarImages[] | Imagens do carro vinculado na tabela de carImages                              |

### Endpoints

| Método | Rota               | Descrição                                                      |
| ------ | ------------------ | -------------------------------------------------------------- |
| POST   | /cars              | Criação de um anúncio de carro                                 |
| GET    | /cars              | Lista os anúncios de carros                                    |
| GET    | /cars/user/:userId | Lista os anúncios de carros vinculados a um usuário específico |
| GET    | /cars/:carId       | Lista o anúncio de um carro em específico                      |
| PATCH  | /cars/:carId       | Atualiza o anúncio de um carro                                 |
| DELETE | /cars/:carId       | Delete o anúncio de um carro                                   |

---

## 4. **CarImages**

[Voltar para a Estrutura da API](#5-estrutura-da-api)

O objeto CarImages é definido como:

| Campo | Tipo   | Descrição                           |
| ----- | ------ | ----------------------------------- |
| id    | String | Identificador único do contato      |
| url   | String | Endereço da imagem                  |
| car   | Cars   | Anúncio de carro vinculado a imagem |
| carId | String | Id do anúncio do carro vinculado    |

---

## 5. **Comments**

[Voltar para a Estrutura da API](#5-estrutura-da-api)

O objeto Comments é definido como:

| Campo     | Tipo     | Descrição                                          |
| --------- | -------- | -------------------------------------------------- |
| id        | String   | Identificador único do contato                     |
| content   | String   | Conteúdo do comentário                             |
| user      | Users    | Usuário que fez o comentário                       |
| userId    | String   | Id do usuário que fez o comentário                 |
| car       | Cars     | Anúncio do carro onde o comentário foi feito       |
| carId     | String   | Id do anúncio do carro onde o comentário foi feito |
| createdAt | DateTime | Data de criação do comentário                      |

### Endpoints

| Método | Rota             | Descrição                                       |
| ------ | ---------------- | ----------------------------------------------- |
| POST   | /comments/:carId | Criação de um comentário                        |
| GET    | /comments/:carId | Listagem dos comentários de um anúncio de carro |

---

## 6. **Filters**

[Voltar para a Estrutura da API](#5-estrutura-da-api)

### Endpoints

| Método | Rota                              | Descrição                                                                               |
| ------ | --------------------------------- | --------------------------------------------------------------------------------------- |
| GET    | /filters?:filterName=:filterValue | Listar os veículos com algum tipo de filtragem, sendo que a filtragem pode ser opcional |

---

## Autores do projeto

- Joseph Vriesman [GitHub](https://github.com/Joseph18CV) - [LinkedIn](https://www.linkedin.com/in/josephvriesman/)
- Antonio Santos [GitHub](https://github.com/AntonioSantosBJPE) - [LinkedIn](https://www.linkedin.com/in/antonio-santos-b934a479/)
- Rafael Carvalho [GitHub](https://github.com/rafaeuus) - [LinkedIn](https://www.linkedin.com/in/rafael-s-carvalho/)
- Ricardo Czajkowski [GitHub](https://github.com/ricardocza) - [LinkedIn](https://www.linkedin.com/in/ricardo-cza/)
- Tomás Lillo Sanhueza [GitHub](https://github.com/TommiL90) - [LinkedIn](https://www.linkedin.com/in/tomasbenjamin/)
