import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as fs from 'fs';
import helmet from 'helmet';

// Load vars in .env in PROCESS.ENV
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());
  app.enableCors({
    origin: [
      process.env.APP_URL || process.env.ESP_URL || 'http://localhost:4200',
    ],
    credentials: true,
  });

  if (process.env.NODE_ENV === 'development') {
    const config = new DocumentBuilder()
      .setTitle('RFID Dashboard')
      .setDescription('RFID Dashboard API')
      .setVersion('0.0.0')
      .build();
    const document = SwaggerModule.createDocument(app, config);

    fs.writeFileSync('./swagger.json', JSON.stringify(document));

    SwaggerModule.setup('api', app, document);
  }

  await app.listen(3000);
}
bootstrap();
