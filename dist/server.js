"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const database_1 = require("./config/database");
database_1.AppDataSource.initialize()
    .then(() => {
    console.log('Data Source has been initialized!');
    const PORT = process.env.PORT || 3000;
    app_1.default.listen(PORT, () => {
        console.log(`Server running on port http://localhost:${PORT}`);
    });
})
    .catch((err) => {
    console.error('Error during Data Source initialization:', err);
});
