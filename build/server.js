"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const routers_1 = require("./routes/routers");
const sequelize_typescript_1 = require("sequelize-typescript");
class Server {
    constructor() {
        this.app = express();
        this.middleware();
        this.routes();
        this.connectDatabase();
    }
    middleware() {
        const app = this.app;
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());
        app.use(morgan('dev'));
        this.app.use(cors());
    }
    routes() {
        this.app.use('/api/', routers_1.default);
    }
    connectDatabase() {
        this.sequelize = new sequelize_typescript_1.Sequelize({
            database: 'note',
            dialect: 'postgres',
            username: 'me',
            password: 'me123',
            modelPaths: [__dirname + '/models']
        });
    }
    getSequelize() {
        return this.sequelize;
    }
}
const server = new Server();
exports.default = server.app;
exports.sequelize = server.getSequelize();
//# sourceMappingURL=server.js.map