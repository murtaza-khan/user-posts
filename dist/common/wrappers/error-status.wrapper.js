"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constructErrorResponse = void 0;
const common_1 = require("@nestjs/common");
const exceptions = {
    400: common_1.BadRequestException,
    404: common_1.NotFoundException,
    500: common_1.InternalServerErrorException,
};
const constructErrorResponse = async (error) => {
    [common_1.BadRequestException, common_1.InternalServerErrorException, common_1.NotFoundException, common_1.UnauthorizedException].forEach(Exception => {
        if (error instanceof Exception) {
            throw error;
        }
    });
    const status = error.status || error.statusCode || common_1.HttpStatus.INTERNAL_SERVER_ERROR;
    const serverError = {
        message: error.message,
        data: error.data || {},
        error: error.error,
        success: false,
    };
    const exception = exceptions[status];
    throw new exception(serverError);
};
exports.constructErrorResponse = constructErrorResponse;
//# sourceMappingURL=error-status.wrapper.js.map