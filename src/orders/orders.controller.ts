import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { OrdersService } from './orders.service';
import type { Order } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  getAllOrders(): Order[] {
    return this.ordersService.getAllOrders();
  }

  @Get(':id')
  getOrderById(@Param('id') id: string): Order {
    const order = this.ordersService.getOrderById(id);
    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }
    return order;
  }
}
