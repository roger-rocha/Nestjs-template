import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe, VersioningType } from "@nestjs/common";
import * as process from "process";
import * as basicAuth from "express-basic-auth";
import * as fs from "fs";

const SWAGGER_ENVS = ["local", "hml"];

async function bootstrap() {
  let httpsOptions = {
    key: fs.readFileSync(`${process.env.SSL_CERT_KEY}`),
    cert: fs.readFileSync(`${process.env.SSL_CERT_CRT}`),
  };

  const app = (await NestFactory.create(AppModule, { httpsOptions }))
    .useGlobalPipes(new ValidationPipe())
    .enableVersioning({
      type: VersioningType.URI,
      defaultVersion: "1",
    });

  app.enableCors({
    allowedHeaders: "*",
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: false,
  });

  if (SWAGGER_ENVS.includes(process.env.NODE_ENV)) {
    if (process.env.NODE_ENV === "hml") {
      app.use(
        ["/api"],
        basicAuth({
          challenge: true,
          users: {
            [process.env.SWAGGER_USER]: process.env.SWAGGER_PASSWORD,
          },
        })
      );
    }

    const config = new DocumentBuilder()
      .setTitle("Nobryo")
      .setDescription("Documentação da api do projeto Nobryo")
      .setVersion("1.0")
      .addBearerAuth(
        {
          type: "http",
          scheme: "bearer",
          bearerFormat: "Bearer",
        },
        "access_token"
      )
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("api", app, document);
  }

  await app.listen(process.env.PORT);
  console.log(
    `Application is running on: ${process.env.BASE_URL}:${process.env.PORT}`
  );
}

bootstrap();
