"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.converToType = void 0;
const clientPrisma_1 = require("../db/clientPrisma");
const converToType = (id) => {
    if (clientPrisma_1.DATA_SOURCE === "postgres") {
        return Number(id);
    }
    else {
        return id;
    }
};
exports.converToType = converToType;
