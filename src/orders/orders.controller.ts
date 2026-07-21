import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { OrdersService } from './orders.service';
import type { Order } from './orders.service';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('Orders')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @ApiOperation({ summary: 'Get all orders' })
  @ApiResponse({ status: 200, description: 'Return order list successfully' })
  @Get()
  getAllOrders(): Order[] {
    return this.ordersService.getAllOrders();
  }

  @ApiOperation({ summary: 'Get the orders by id' })
  @ApiParam({ name: 'id' })
  @ApiResponse({ status: 200, description: 'Return order by id successfully' })
  @ApiResponse({ status: 404, description: 'Can not found order by this id' })
  @Get(':id')
  getOrderById(@Param('id') id: string): Order {
    const order = this.ordersService.getOrderById(id);
    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }
    return order;
  }

  @ApiOperation({ summary: 'Get the order list by userId' })
  @ApiParam({ name: 'userId' })
  @ApiResponse({
    status: 200,
    description: 'Return the order list by userId successfully',
  })
  @Get('user/:userId')
  getOrdersByUserId(@Param('userId') userId: string): Order[] {
    return this.ordersService.getOrdersByUserId(userId);
  }
}
