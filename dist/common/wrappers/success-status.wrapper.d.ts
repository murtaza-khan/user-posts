import { SuccessResponseDto } from '../dto/success-response.dto';
export declare const constructSuccessResponse: <T>(data: T, message?: string) => SuccessResponseDto<T>;
