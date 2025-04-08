import mongoose from "mongoose";
import request from "supertest";
import app from "../app";

jest.setTimeout(20000);

let createdCategoryId: string;
let token: string;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI as string);

  await request(app).post("/api/auth/register").send({
    name: "Test",
    email: "test@example.com",
    password: "password",
  });

  const loginRes = await request(app).post("/api/auth/login").send({
    email: "test@example.com",
    password: "password",
  });

  token = loginRes.body.token;
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe("Auth Routes", () => {
  it("should register a user", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({ name: "User", email: "user@example.com", password: "password" });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("_id");
  });

  it("should login a user", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "user@example.com", password: "password" });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
  });
});

describe("Category Routes", () => {
  it("should create a new category", async () => {
    const res = await request(app)
      .post("/api/category")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Books", status: "active" });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("_id");
    expect(res.body.name).toBe("Books");
    createdCategoryId = res.body._id;
  });

  it("should get all categories", async () => {
    const res = await request(app)
      .get("/api/category")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("should update a category", async () => {
    const res = await request(app)
      .put(`/api/category/${createdCategoryId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Updated Books", status: "inactive" });

    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("Updated Books");
    expect(res.body.status).toBe("inactive");
  });

  it("should delete a category", async () => {
    const res = await request(app)
      .delete(`/api/category/${createdCategoryId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Category deleted successfully");
  });
});
