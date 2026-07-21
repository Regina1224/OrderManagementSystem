import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import type { User } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @ApiOperation({ summary: 'Get all users list' })
  @ApiResponse({ status: 200, description: 'Return all users successfully' })
  @Get()
  getAllUsers(): User[] {
    return this.usersService.getAllUsers();
  }
}
