import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { OrderGrpcService } from './order.grpc.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly orders: OrderGrpcService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('orders')
  createOrder(@Body() body: { productId: number; quantity: number }) {
    return this.orders.createOrder(body);
  }
}
