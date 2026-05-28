<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

create guard 
npx nest g gu auth/auth --flat --no-spec

add typeorm 
npm i @nestjs/typeorm typeorm @nestjs/config pg
module categori
npx nest g mo categories/categories --flat --no-spec
controlador
npx nest g co categories/categories --flat --no-spec
service
npx nest g s categories/categories --flat --no-spec
migracion
npm run migration:create ./src/migrations/Migration

Explícame el flujo de autenticación de usuarios en tu aplicación

En mi aplicación backend implementé autenticación basada en JWT utilizando NestJS.

El flujo comienza cuando el cliente envía una petición POST hacia la ruta `/auth/signin` con email y password.

Primero, el controller recibe la request y la envía al AuthService. Dentro del servicio verifico que el usuario exista buscando el email en la base de datos mediante el repository.

Después comparo la contraseña enviada con la contraseña hasheada almacenada en la base de datos utilizando bcrypt.compare.

Si las credenciales son inválidas, lanzo excepciones HTTP como:

* 400 Bad Request
* 401 Unauthorized

Si las credenciales son correctas, genero un JWT firmado utilizando JwtService.

El payload contiene información básica del usuario, como:

* id
* email

Luego el servidor devuelve el token al cliente.

En las siguientes peticiones privadas, el cliente debe enviar el token en el header Authorization utilizando el formato:

Bearer token

Las rutas privadas están protegidas con un AuthGuard. El guard intercepta la request antes de llegar al controller y valida el JWT utilizando jwtService.verify.

Si el token es válido, el usuario obtiene acceso a la ruta protegida. Si el token es inválido o expiró, el sistema responde con UnauthorizedException.

También utilicé DTOs y class-validator para validar la entrada de datos y mantener la seguridad y consistencia de la aplicación.



FLUJO COMPLETO DEL SIGNUP - POST /auth/signup
HTTP Request
→ Middleware
→ Pipe + DTO Validation
→ AuthController
→ AuthService
→ UsersRepository
→ PostgreSQL
→ Response


orden Request HTTP
↓
Middleware
↓
Guard
↓
Interceptor (before)
↓
Pipe + DTO validation
↓
Controller
↓
Service
↓
Repository
↓
Database
↓
response
↓
Interceptor (after)

La línea `user: Partial<User>` utiliza la estructura de la entity User, pero permite trabajar con objetos parciales donde todas las propiedades son opcionales.

Esto proporciona más flexibilidad al momento de crear o actualizar usuarios.

La línea `this.usersRepository.save(user)` utiliza TypeORM para guardar los datos del objeto user dentro de PostgreSQL.

TypeORM genera automáticamente la query SQL necesaria para insertar o actualizar el registro en la base de datos.
