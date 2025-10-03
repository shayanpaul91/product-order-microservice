import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrderGrpcController } from './order.grpc.controller';
import { OrderGrpcService } from './order.grpc.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'PRODUCT_PACKAGE',
        transport: Transport.GRPC,
        options: {
          package: 'product',
          protoPath: join(process.cwd(), 'proto/product.proto'),
          url: process.env.PRODUCT_SERVICE_URL || 'product-service:50051',
        },
      },
    ]),
  ],
  controllers: [AppController, OrderGrpcController],
  providers: [AppService, OrderGrpcService],
})
export class AppModule {}
