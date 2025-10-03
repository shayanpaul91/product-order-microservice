import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { Order, OrderGrpcService } from './order.grpc.service';

@Controller()
export class OrderGrpcController {
  constructor(private readonly orderService: OrderGrpcService) {}

  @GrpcMethod('OrderService', 'CreateOrder')
  createOrder(data: { productId: number; quantity: number }): Promise<Order> | Order {
    return this.orderService.createOrder(data);
  }

  @GrpcMethod('OrderService', 'GetOrder')
  getOrder(data: { id: number }): Order {
    return this.orderService.getOrder(data);
  }

  @GrpcMethod('OrderService', 'ListOrders')
  listOrders(): { items: Order[] } {
    return this.orderService.listOrders();
  }

  @GrpcMethod('OrderService', 'UpdateOrder')
  updateOrder(data: { id: number; productId?: number; quantity?: number; status?: string }): Order {
    return this.orderService.updateOrder(data);
  }

  @GrpcMethod('OrderService', 'DeleteOrder')
  deleteOrder(data: { id: number }): { success: boolean } {
    return this.orderService.deleteOrder(data);
  }
}


