"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const pg_1 = require("pg");
const pool = new pg_1.Pool();
exports.db = {
    query: (text, params) => pool.query(text, params),
};
