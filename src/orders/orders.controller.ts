import { Controller, Get } from '@nestjs/common';

@Controller('orders')
export class OrdersController {
  @Get()
  getAllOrders(): string {
    return 'order list';
  }
}
