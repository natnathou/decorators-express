"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
class AppRouter {
    static instance;
    static getInstance() {
        if (!this.instance) {
            this.instance = router;
        }
        return this.instance;
    }
}
exports.default = AppRouter;
//# sourceMappingURL=router.js.map