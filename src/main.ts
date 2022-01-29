import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ErrorInterceptor } from './infrastructure/interceptors/error.interceptor';
import { LoggingInterceptor } from './infrastructure/interceptors/logging.interceptor';
import { INestApplication, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await createHexagonalApp();
  initSwaggerDocumentation(app);

  await startApp(app);
}
bootstrap();

async function createHexagonalApp(): Promise<INestApplication> {
  const app: INestApplication = await NestFactory.create(AppModule);
  app.enableCors();

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  app.useGlobalInterceptors(new ErrorInterceptor());
  app.useGlobalInterceptors(new LoggingInterceptor());

  return app;
}

async function startApp(app: INestApplication): Promise<void> {
  const configService = app.get(ConfigService);
  const port = configService.get('PORT');

  await app.listen(port, () => {
    console.log(`Server its running on port ${port}`);
  });
}

function initSwaggerDocumentation(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Hexagonal Nest') //Microservice title
    .setDescription('Nest Application using hexagonal architecture') //Microservice desc
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}
