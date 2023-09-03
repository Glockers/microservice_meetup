import {
  Catch,
  RpcExceptionFilter,
  Logger,
  ArgumentsHost
} from '@nestjs/common';
import { RmqContext, RpcException } from '@nestjs/microservices';
import { Observable, throwError } from 'rxjs';

@Catch()
export class RpcFilter implements RpcExceptionFilter {
  catch(error: unknown, host: ArgumentsHost): Observable<never> {
    new Logger().error(error, 'Microservice');

    const context = host.switchToRpc().getContext<RmqContext>();
    const channel = context.getChannelRef();
    channel.ack(context.getMessage());

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
