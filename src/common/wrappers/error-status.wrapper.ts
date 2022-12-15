import {
  BadRequestException,
  UnauthorizedException,
  NotFoundException,
  InternalServerErrorException,
  HttpStatus,
} from '@nestjs/common';
import { ResponseDto } from '../dto/generic-response.dto';

const exceptions = {
  400: BadRequestException,
  401: UnauthorizedException,
  404: NotFoundException,
  500: InternalServerErrorException,
  502: InternalServerErrorException,
  503: InternalServerErrorException,
};

export const constructErrorResponse = async error => {
  [BadRequestException, InternalServerErrorException, NotFoundException, UnauthorizedException].forEach(Exception => {
    if (error instanceof Exception) {
      throw error;
    }
  });

  const status = error.status || error.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
  const serverError: ResponseDto = {
    message: error.message,
    data: error.data || {},
    error: error.error,
    success: false,
  };

  const exception = exceptions[status];
  throw new exception(serverError);
};
