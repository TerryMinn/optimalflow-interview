"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
const db_1 = require("@/config/db");
describe("POST /transfers", () => {
    it("should transfer success", async () => {
        const sender = await db_1.prisma.user.findFirst({
            where: {
                email: process.env.SEED_EMAIL,
            },
        });
        const receiver = await db_1.prisma.user.findFirst({
            where: {
                email: process.env.SEED_EMAIL_S,
            },
        });
        const loginRes = await (0, supertest_1.default)(app_1.default).post("/api/v1/login").send({
            email: process.env.SEED_EMAIL,
            password: process.env.SEED_PASSWORD,
        });
        const res = await (0, supertest_1.default)(app_1.default)
            .post("/api/v1/transfer")
            .send({
            amount: 50,
            senderId: sender?.id,
            receiverId: receiver?.id,
        })
            .set("Authorization", `Bearer ${loginRes.body.token}`);
        expect(res.status).toBe(201);
    });
});
describe("GET /transfers", () => {
    it("should get all transfers", async () => {
        const loginRes = await (0, supertest_1.default)(app_1.default).post("/api/v1/login").send({
            email: process.env.SEED_EMAIL,
            password: process.env.SEED_PASSWORD,
        });
        const res = await (0, supertest_1.default)(app_1.default)
            .get("/api/v1/transfer")
            .set("Authorization", `Bearer ${loginRes.body.token}`);
        expect(res.status).toBe(200);
    });
});
