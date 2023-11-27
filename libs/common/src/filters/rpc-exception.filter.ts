import { Catch, RpcExceptionFilter, Logger } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Observable, throwError } from 'rxjs';

@Catch()
export class RpcFilter implements RpcExceptionFilter {
  catch(error: unknown): Observable<never> {
    new Logger().error(error, 'Microservice');

    if (error instanceof RpcException) {
      return throwError(() => error.getError());
    }
    return throwError(() => {
      return {
        status: 500,
        message: error
      };
    });
  }
}
