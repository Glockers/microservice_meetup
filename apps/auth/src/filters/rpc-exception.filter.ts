import { Catch, RpcExceptionFilter } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { RpcException } from '@nestjs/microservices';

@Catch(RpcException)
export class RpcFilter implements RpcExceptionFilter<RpcException> {
  catch(exception: RpcException): Observable<never> {
    return throwError(() => exception.getError());
  }
}
