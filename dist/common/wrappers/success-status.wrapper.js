"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.constructSuccessResponse = void 0;
const serverResponse_1 = require("../constants/serverResponse");
const { OK_MESSAGE } = serverResponse_1.SERVER_RESPONSES;
const constructSuccessResponse = (data, message) => {
    const response = {
        message: message || OK_MESSAGE,
        data: data,
        success: true,
    };
    return response;
};
exports.constructSuccessResponse = constructSuccessResponse;
//# sourceMappingURL=success-status.wrapper.js.map