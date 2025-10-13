import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { CreateUserDto } from '../src/user/dtos/create-user.dto';

describe('User Controller (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/user/create (POST)', () => {
    const createUserDto: CreateUserDto = {
      name: 'Test User',
      email: `test-${Math.random()}@example.com`,
      password: 'password123',
      roleid: 1,
    };

    return request(app.getHttpServer())
      .post('/user/create')
      .send(createUserDto)
      .expect(201)
      .then((res) => {
        expect(res.body).toHaveProperty('id');
        expect(res.body.email).toEqual(createUserDto.email);
      });
  });
});
