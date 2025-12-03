import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{cors:true});
  app.enableCors({
  origin: ['http://localhost:5173', 'http://localhost:3000','https://code-inbound.onrender.com'],
  methods: 'GET,POST,PUT,PATCH,DELETE',
  allowedHeaders: 'Content-Type, Authorization',
  credentials: true
});
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
