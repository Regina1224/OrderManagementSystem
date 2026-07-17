import { Injectable } from '@nestjs/common';

export enum Category {
  Electronics = 'Electronics',
  Clothing = 'Clothing',
  Food = 'Food',
  Books = 'Books',
}

export type OrderStatus = 'failed' | 'pending' | 'delivered' | 'completed';

export interface Order {
  id: string;
  userId: string;
  customer: string;
  category: Category;
  product: string;
  quantity: number;
  status: OrderStatus;
}

@Injectable()
export class OrdersService {
  private orders: Order[] = [
    {
      id: 'a1b2c3d4-0001',
      userId: 'u-1001',
      customer: 'John Smith',
      category: Category.Electronics,
      product: 'Laptop',
      quantity: 1,
      status: 'pending',
    },
    {
      id: 'a1b2c3d4-0002',
      userId: 'u-1002',
      customer: 'Emma Wilson',
      category: Category.Clothing,
      product: 'Winter Jacket',
      quantity: 2,
      status: 'delivered',
    },
    {
      id: 'a1b2c3d4-0003',
      userId: 'u-1001',
      customer: 'John Smith',
      category: Category.Food,
      product: 'Coffee Beans',
      quantity: 3,
      status: 'completed',
    },
    {
      id: 'a1b2c3d4-0004',
      userId: 'u-1003',
      customer: 'Liam Chen',
      category: Category.Books,
      product: 'TypeScript Handbook',
      quantity: 1,
      status: 'pending',
    },
    {
      id: 'a1b2c3d4-0005',
      userId: 'u-1004',
      customer: 'Olivia Brown',
      category: Category.Electronics,
      product: 'Wireless Mouse',
      quantity: 1,
      status: 'failed',
    },
    {
      id: 'a1b2c3d4-0006',
      userId: 'u-1002',
      customer: 'Emma Wilson',
      category: Category.Clothing,
      product: 'Running Shoes',
      quantity: 1,
      status: 'completed',
    },
    {
      id: 'a1b2c3d4-0007',
      userId: 'u-1005',
      customer: 'Noah Davis',
      category: Category.Food,
      product: 'Green Tea',
      quantity: 5,
      status: 'delivered',
    },
    {
      id: 'a1b2c3d4-0008',
      userId: 'u-1003',
      customer: 'Liam Chen',
      category: Category.Electronics,
      product: 'Mechanical Keyboard',
      quantity: 1,
      status: 'pending',
    },
    {
      id: 'a1b2c3d4-0009',
      userId: 'u-1006',
      customer: 'Ava Martinez',
      category: Category.Books,
      product: 'Clean Code',
      quantity: 2,
      status: 'completed',
    },
    {
      id: 'a1b2c3d4-0010',
      userId: 'u-1004',
      customer: 'Olivia Brown',
      category: Category.Food,
      product: 'Olive Oil',
      quantity: 1,
      status: 'failed',
    },
  ];

  getAllOrders(): Order[] {
    return this.orders;
  }
}
