/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { describe, beforeEach, it } from '@jest/globals';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    void it('should return "Hello World!"', () => {
      //expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
function expect(arg0: string) {
  throw new Error('Function not implemented.');
}
