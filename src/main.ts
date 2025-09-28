import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseIntercept } from './response-interceptor/response.interceptor';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.useGlobalInterceptors(new ResponseIntercept());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  const config = docConfig();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);
  await app.listen(process.env.PORT ?? 4000);
}
function docConfig() {
  return new DocumentBuilder()
    .setTitle('Sale Management')
    .setDescription('The Sale Management API description')
    .setVersion('1.0')
    .addTag('sales')
    .build();
}
bootstrap();
