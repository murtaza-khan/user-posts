"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.passwordBcrypt = void 0;
const bcrypt = require("bcrypt");
async function passwordBcrypt(password) {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash) => {
                resolve(hash);
            });
        });
    });
}
exports.passwordBcrypt = passwordBcrypt;
//# sourceMappingURL=bcrypt.js.map