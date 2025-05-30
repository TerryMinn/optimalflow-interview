import request from "supertest";
import app from "../app";
import { prisma } from "@/config/db";

describe("POST /transfers", () => {
  it("should transfer success", async () => {
    const sender = await prisma.user.findFirst({
      where: {
        email: process.env.SEED_EMAIL,
      },
    });
    const receiver = await prisma.user.findFirst({
      where: {
        email: process.env.SEED_EMAIL_S,
      },
    });

    const loginRes = await request(app).post("/api/v1/login").send({
      email: process.env.SEED_EMAIL,
      password: process.env.SEED_PASSWORD,
    });

    const res = await request(app)
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
    const loginRes = await request(app).post("/api/v1/login").send({
      email: process.env.SEED_EMAIL,
      password: process.env.SEED_PASSWORD,
    });

    const res = await request(app)
      .get("/api/v1/transfer")
      .set("Authorization", `Bearer ${loginRes.body.token}`);
    expect(res.status).toBe(200);
  });
});
