import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: 'order',
      protoPath: join(process.cwd(), 'proto/order.proto'),
      url: '0.0.0.0:50052',
    }
  });
  await app.startAllMicroservices();
  await app.listen(3001, '0.0.0.0');
}
bootstrap();
