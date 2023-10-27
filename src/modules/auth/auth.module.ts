import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './guard/jwt.strategy';
import { AuthService } from './auth.service';
import { AuthResolver } from './graphql/auth.resolver';
import { UserService } from '../user/user.service';
import { PrismaModule } from '../../../prisma/prisma.module';
import { AuthSeedService } from './auth.seed.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: process.env.SECRET_KEY,
      }),
    }),
    PrismaModule,
  ],
  providers: [
    JwtStrategy,
    AuthService,
    UserService,
    AuthResolver,
    AuthSeedService,
  ],
  exports: [PassportModule, JwtModule],
})
export class AuthModule {}
