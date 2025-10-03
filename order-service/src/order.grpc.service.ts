import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

interface ProductServiceClient {
  GetProduct(data: { id: number }): any;
}

interface Product {
  id: number;
  name: string;
  price: number;
}

export interface Order {
  id: number;
  productId: number;
  quantity: number;
  total: number;
  status: string;
}

@Injectable()
export class OrderGrpcService implements OnModuleInit {
  private productService!: ProductServiceClient;
  private orders: Order[] = [];
  private nextId = 1;

  constructor(@Inject('PRODUCT_PACKAGE') private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.productService = this.client.getService<ProductServiceClient>('ProductService');
  }

  async createOrder(data: { productId: number; quantity: number }): Promise<Order> {
    const product: Product = await this.fetchProduct(data.productId);

    const total = (product?.price ?? 0) * data.quantity;
    const order: Order = {
      id: this.nextId++,
      productId: data.productId,
      quantity: data.quantity,
      total,
      status: 'CREATED',
    };
    this.orders.push(order);
    return order;
  }

  getOrder(byId: { id: number }): Order {
    const found = this.orders.find((o) => o.id === byId.id);
    return found ?? { id: 0, productId: 0, quantity: 0, total: 0, status: '' };
  }

  listOrders(): { items: Order[] } {
    return { items: this.orders };
  }

  updateOrder(data: { id: number; productId?: number; quantity?: number; status?: string }): Order {
    const index = this.orders.findIndex((o) => o.id === data.id);
    if (index === -1) {
      return { id: 0, productId: 0, quantity: 0, total: 0, status: '' };
    }
    const current = this.orders[index];
    const productId = data.productId ?? current.productId;
    const quantity = data.quantity ?? current.quantity;
    const total = current.total; // simple; could recalc via product price
    const updated: Order = {
      id: current.id,
      productId,
      quantity,
      total,
      status: data.status ?? current.status,
    };
    this.orders[index] = updated;
    return updated;
  }

  deleteOrder(byId: { id: number }): { success: boolean } {
    const before = this.orders.length;
    this.orders = this.orders.filter((o) => o.id !== byId.id);
    return { success: this.orders.length < before };
  }

  private async getProductFallback(productId: number): Promise<Product> {
    return { id: productId, name: '', price: 0 };
  }

  private async fetchProduct(productId: number): Promise<Product> {
    try {
      const observable = this.productService.GetProduct({ id: productId });
      const result = await lastValueFrom(observable);
      return result as Product;
    } catch (e) {
      return this.getProductFallback(productId);
    }
  }
}


