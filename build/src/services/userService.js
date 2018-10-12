"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../models/user");
const server_1 = require("../server");
const apiError_1 = require("../util/apiError");
const authService_1 = require("./authService");
class UserService {
    static insertUser(user) {
        return server_1.sequelize.transaction((transaction) => {
            return user_1.default.create(user, { transaction }).then((user) => {
                const token = authService_1.default.createTokenResponse(user);
                return { token };
            }).catch((err) => {
                throw apiError_1.default.badRequestError(err.errors[0].message);
            });
        });
    }
}
exports.default = UserService;
//# sourceMappingURL=userService.js.map