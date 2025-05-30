import request from "supertest";
import { resetDatabase } from "./setup";
import app from "../app";
import { execSync } from "child_process";

describe("POST /users", () => {
  beforeEach(async () => {
    resetDatabase();
  });

  it("should register success", async () => {
    const res = await request(app)
      .post("/api/v1/users")
      .send({ email: "test@gmail.com", password: "testingPass", name: "test" });

    expect(res.status).toBe(201);
  });

  it("should register fail", async () => {
    const res = await request(app)
      .post("/api/v1/users")
      .send({ email: "test@gmail.com", password: "", name: "test" });

    expect(res.status).toBe(400);
  });
});

describe("POST /login", () => {
  beforeEach(async () => {
    // resetDatabase();
    execSync("npx prisma db seed", { stdio: "inherit" });
  });
  it("should login success", async () => {
    const loginRes = await request(app).post("/api/v1/login").send({
      email: process.env.SEED_EMAIL,
      password: process.env.SEED_PASSWORD,
    });

    expect(loginRes.status).toBe(200);
  });
});
