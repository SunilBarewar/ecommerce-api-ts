"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const routes_1 = __importDefault(require("./routes"));
const logger_utils_1 = __importDefault(require("./utils/logger.utils"));
const corsOptions_1 = __importDefault(require("./utils/corsOptions"));
const setHeaderCredentials_middleware_1 = __importDefault(require("./middleware/setHeaderCredentials.middleware"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
// set acces control res headers
app.use(setHeaderCredentials_middleware_1.default);
// configure cors
app.use((0, cors_1.default)(corsOptions_1.default));
// parse the req body
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
//parse the cookies
app.use((0, cookie_parser_1.default)());
app.get("/", (req, res) => {
    res.status(200).json({ message: "server started" });
});
app.use("/api", routes_1.default);
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        yield mongoose_1.default.connect(process.env.MONGO_DB_URL, {
            retryWrites: true,
        });
        const port = process.env.PORT || 5000;
        app.listen(port, () => {
            logger_utils_1.default.info("server running on port ", port);
        });
    });
}
bootstrap();
