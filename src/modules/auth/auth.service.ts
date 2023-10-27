import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { CreateOneUserArgs } from '../user/graphql/args/CreateOneUserArgs';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async getUserIdByRefreshToken(token: string): Promise<string> {
    const decodedToken = await jwt.verify(token, process.env.SECRET_KEY);

    if (typeof decodedToken === 'string') {
      throw new UnauthorizedException();
    }
    const userId = (decodedToken as any)?.userId;
    const expirationDate = new Date(decodedToken.exp * 1000);
    const currentDate = new Date();

    if (expirationDate < currentDate || !userId) {
      throw new UnauthorizedException();
    }

    return userId;
  }

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.userService.findByUsername(username);

    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  async createUser(args: CreateOneUserArgs) {
    const hashedPassword = await bcrypt.hash(args.password, 10);
    return await this.userService.create({ ...args, password: hashedPassword });
  }

  async findUserById(userId: string): Promise<User | null> {
    return this.userService.findById(userId);
  }

  async generateTokens(
    user: User,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const accessTokenPayload = { userId: user.id, role: user.role };
    const refreshTokenPayload = { userId: user.id, tokenType: 'refresh' };

    const accessToken = await this.jwtService.signAsync(accessTokenPayload, {
      expiresIn: '15m',
    });
    const refreshToken = await this.jwtService.signAsync(refreshTokenPayload, {
      expiresIn: '7d',
    });

    return { accessToken, refreshToken };
  }
}
