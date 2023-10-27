import { Test, TestingModule } from '@nestjs/testing';
import { AuthResolver } from './graphql/auth.resolver';
import { CreateOneUserArgs } from '../user/graphql/args/CreateOneUserArgs';
import { AppModule } from '../../app.module';
import { INestApplication } from '@nestjs/common';

describe('AuthResolver', () => {
  let app: INestApplication;
  let authResolver: AuthResolver;
  let now: Date;

  beforeEach(async () => {
    process.env.DB_HOST = 'localhost';
    process.env.DB_PORT = '5432';
    process.env.DB_USERNAME = 'postgres';
    process.env.DB_PASSWORD = 'postgres';
    process.env.DB = 'blog';
    process.env.SECRET_KEY = 'secret_key';

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    authResolver = moduleFixture.get<AuthResolver>(AuthResolver);
    now = new Date();
  });

  describe('register', () => {
    it('should return auth tokens', async () => {
      const creds: CreateOneUserArgs = {
        email: `test${now.getTime()}@register.com`,
        password: 'test',
      };

      const tokens = await authResolver.register(creds);

      expect(typeof tokens.accessToken).toEqual('string');
      expect(typeof tokens.refreshToken).toEqual('string');
    });
  });

  describe('login', () => {
    it('should return auth tokens', async () => {
      const creds: CreateOneUserArgs = {
        email: `test${now.getTime()}@login.com`,
        password: 'test',
      };

      await authResolver.register(creds);
      const tokens = await authResolver.login(creds);

      expect(typeof tokens.accessToken).toEqual('string');
      expect(typeof tokens.refreshToken).toEqual('string');
    });
  });

  describe('refresh', () => {
    it('should return auth tokens', async () => {
      const creds: CreateOneUserArgs = {
        email: `test${now.getTime()}@refresh.com`,
        password: 'test',
      };

      const tokens = await authResolver.register(creds);
      const refreshTokens = await authResolver.refresh({
        token: tokens.refreshToken,
      });

      expect(typeof refreshTokens.accessToken).toEqual('string');
      expect(typeof refreshTokens.refreshToken).toEqual('string');
    });
  });
});
