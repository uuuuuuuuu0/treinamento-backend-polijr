"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.get('/test', (request, response) => {
    return response.json({ message: "Hello world!" });
});
app.listen(3333, () => {
    console.log('\x1b[1;4;96mServer started on port 3333!\x1b[0n');
});
