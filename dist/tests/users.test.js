"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../app"));
const faker_1 = require("@faker-js/faker");
describe("POST /users", () => {
    it("should register success", async () => {
        const res = await (0, supertest_1.default)(app_1.default).post("/api/v1/users").send({
            email: faker_1.faker.internet.email(),
            password: faker_1.faker.internet.password(),
            name: faker_1.faker.person.firstName(),
        });
        expect(res.status).toBe(201);
    });
    it("should register fail", async () => {
        const res = await (0, supertest_1.default)(app_1.default).post("/api/v1/users").send({
            email: faker_1.faker.internet.email(),
            password: "",
            name: faker_1.faker.person.firstName(),
        });
        expect(res.status).toBe(400);
    });
});
describe("POST /login", () => {
    it("should login success", async () => {
        const loginRes = await (0, supertest_1.default)(app_1.default).post("/api/v1/login").send({
            email: process.env.SEED_EMAIL,
            password: process.env.SEED_PASSWORD,
        });
        expect(loginRes.status).toBe(200);
    });
    it("should login fail", async () => {
        const loginRes = await (0, supertest_1.default)(app_1.default).post("/api/v1/login").send({
            email: process.env.SEED_EMAIL,
            password: "wrongPassword",
        });
        expect(loginRes.status).toBe(400);
    });
});
describe("GET /users", () => {
    it("should get all users", async () => {
        const loginRes = await (0, supertest_1.default)(app_1.default).post("/api/v1/login").send({
            email: process.env.SEED_EMAIL,
            password: process.env.SEED_PASSWORD,
        });
        const res = await (0, supertest_1.default)(app_1.default)
            .get("/api/v1/users")
            .set("Authorization", `Bearer ${loginRes.body.token}`);
        expect(res.status).toBe(200);
    });
});
describe("GET /users/:id", () => {
    it("should get user by id", async () => {
        const loginRes = await (0, supertest_1.default)(app_1.default).post("/api/v1/login").send({
            email: process.env.SEED_EMAIL,
            password: process.env.SEED_PASSWORD,
        });
        const res = await (0, supertest_1.default)(app_1.default)
            .get(`/api/v1/users/${loginRes.body.data.id}`)
            .set("Authorization", `Bearer ${loginRes.body.token}`);
        expect(res.status).toBe(200);
    });
});
describe("GET /users/:id/transfer", () => {
    it("should get user transfer data by id", async () => {
        const loginRes = await (0, supertest_1.default)(app_1.default).post("/api/v1/login").send({
            email: process.env.SEED_EMAIL,
            password: process.env.SEED_PASSWORD,
        });
        const res = await (0, supertest_1.default)(app_1.default)
            .get(`/api/v1/users/${loginRes.body.data.id}/transfer`)
            .set("Authorization", `Bearer ${loginRes.body.token}`);
        expect(res.status).toBe(200);
    });
});
