import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  Logger
} from '@nestjs/common';

interface HttpException {
  message: string;
  status: number;
}

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.status || HttpStatus.INTERNAL_SERVER_ERROR;
    const message = exception || {
      message: 'Internal Server Error'
    };
    new Logger().error(exception, 'Gateway');
    response.status(status).json(message);
  }
}
