import request from "supertest";
import app from "../app";
import { faker } from "@faker-js/faker";

describe("POST /users", () => {
  it("should register success", async () => {
    const res = await request(app).post("/api/v1/users").send({
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.person.firstName(),
    });

    expect(res.status).toBe(201);
  });

  it("should register fail", async () => {
    const res = await request(app).post("/api/v1/users").send({
      email: faker.internet.email(),
      password: "",
      name: faker.person.firstName(),
    });

    expect(res.status).toBe(400);
  });
});

describe("POST /login", () => {
  it("should login success", async () => {
    const loginRes = await request(app).post("/api/v1/login").send({
      email: process.env.SEED_EMAIL,
      password: process.env.SEED_PASSWORD,
    });

    expect(loginRes.status).toBe(200);
  });

  it("should login fail", async () => {
    const loginRes = await request(app).post("/api/v1/login").send({
      email: process.env.SEED_EMAIL,
      password: "wrongPassword",
    });

    expect(loginRes.status).toBe(400);
  });
});

describe("GET /users", () => {
  it("should get all users", async () => {
    const loginRes = await request(app).post("/api/v1/login").send({
      email: process.env.SEED_EMAIL,
      password: process.env.SEED_PASSWORD,
    });

    const res = await request(app)
      .get("/api/v1/users")
      .set("Authorization", `Bearer ${loginRes.body.token}`);

    expect(res.status).toBe(200);
  });
});

describe("GET /users/:id", () => {
  it("should get user by id", async () => {
    const loginRes = await request(app).post("/api/v1/login").send({
      email: process.env.SEED_EMAIL,
      password: process.env.SEED_PASSWORD,
    });

    const res = await request(app)
      .get(`/api/v1/users/${loginRes.body.data.id}`)
      .set("Authorization", `Bearer ${loginRes.body.token}`);
    expect(res.status).toBe(200);
  });
});

describe("GET /users/:id/transfer", () => {
  it("should get user transfer data by id", async () => {
    const loginRes = await request(app).post("/api/v1/login").send({
      email: process.env.SEED_EMAIL,
      password: process.env.SEED_PASSWORD,
    });

    const res = await request(app)
      .get(`/api/v1/users/${loginRes.body.data.id}/transfer`)
      .set("Authorization", `Bearer ${loginRes.body.token}`);
    expect(res.status).toBe(200);
  });
});
