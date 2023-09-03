import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus
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
    console.log(exception.message, exception.status);
    const status = exception.status || HttpStatus.INTERNAL_SERVER_ERROR;
    const message = exception || {
      message: 'Internal Server Error'
    };

    response.status(status).json(message);
  }
}
