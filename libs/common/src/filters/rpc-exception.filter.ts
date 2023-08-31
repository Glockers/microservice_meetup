import { Catch, RpcExceptionFilter } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Observable, throwError } from 'rxjs';

@Catch()
export class RpcFilter implements RpcExceptionFilter {
  catch(error: unknown): Observable<never> {
    if (error instanceof RpcException) {
      return throwError(() => error.getError());
    }
    return throwError(() => {
      return {
        status: 500,
        message: 'Server error'
      };
    });
  }
}
