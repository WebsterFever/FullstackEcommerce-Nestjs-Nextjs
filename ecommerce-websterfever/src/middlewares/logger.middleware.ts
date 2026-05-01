import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerGlobalMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl } = req;
    const timestamp = new Date();
    const day = timestamp.getDate();
    const month = timestamp.getMonth() + 1;
    const year = timestamp.getFullYear();
    const time = `${timestamp.getHours()}:${timestamp.getMinutes()}:${timestamp.getSeconds()}`;

    res.on('finish', () => {
      const duration = Date.now() - timestamp.getTime();
      const { statusCode } = res;
      console.log(
        `[${day}/${month}/${year} ${time}] - ${method} ${originalUrl} ${statusCode} - ${duration}ms`,
      );
    });

    next();
  }
}
