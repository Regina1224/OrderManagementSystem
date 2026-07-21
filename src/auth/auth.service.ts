import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../db/entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  // ====== Register =====
  async register(dto: RegisterDto): Promise<{ message: string }> {
    // step 1: check if email has been registered
    const existingUser = await this.userRepository.findOne({
      where: { email: dto.email },
    });
    if (existingUser) {
      throw new ConflictException('Email already registered');
    }

    // step 2: Hash the plaintext password to encrypt
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    // step 3: Create a new User object
    const newUser = this.userRepository.create({
      firstName: dto.firstName,
      lastName: dto.lastName,
      email: dto.email,
      password: hashedPassword,
      dob: dto.dob,
    });

    // step 4: Save to DB
    await this.userRepository.save(newUser);

    // step 5: retuen success info
    return { message: 'User registered successfully' };
  }

  // ===== Login =====
  async login(dto: LoginDto): Promise<string> {
    const user = await this.userRepository.findOne({
      where: { email: dto.email },
    });
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(dto.password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const payload = {
      id: user?.id,
      userName: `${user.firstName} ${user.lastName}`,
    };
    return this.jwtService.sign(payload);
  }
}
