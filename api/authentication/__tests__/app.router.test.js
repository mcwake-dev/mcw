require("../environment/testing");
const request = require("supertest");
const Redis = require("ioredis");

describe("Authentication", () => {
  const redis = new Redis();
  const db = require("../db");
  const app = require("../app.js");

  beforeAll(async () => {
    await redis.del("::ffff:127.0.0.1:rate");
  });

  afterAll(async () => {
    await new Promise((resolve) => {
      redis.quit(() => {
        resolve();
      });
    });
    await new Promise((resolve) => setImmediate(resolve));
    await db.end();
  });

  describe("/api/authentication/pk", () => {
    it("should return a valid PEM public key", async () => {
      const response = await request(app).get("/api/authentication/pk");

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("public_key");
    });
  });
  describe("GET /api/authentication/available/username/:username - user exists", () => {
    it("should return 200 and false when user exists", async () => {
      const response = await request(app).get(
        "/api/authentication/available/username/zofeeney0"
      );

      expect(response.statusCode).toBe(200);
      expect(response.body.available).toBe(false);
    });
    it("should return 200 and true when user does not exist", async () => {
      const response = await request(app).get(
        "/api/authentication/available/username/404usernotfound"
      );

      expect(response.statusCode).toBe(200);
      expect(response.body.available).toBe(true);
    });
  });
  describe("GET /api/authentication/available/email/:email - email exists", () => {
    it("should return 200 and false when available exists", async () => {
      const response = await request(app).get(
        "/api/authentication/available/email/zofeeney0@discovery.com"
      );

      expect(response.statusCode).toBe(200);
      expect(response.body.available).toBe(false);
    });
    it("should return 200 and true when does not email exist", async () => {
      const response = await request(app).get(
        "/api/authentication/available/email/404usernotfound@dontexist.com"
      );

      expect(response.statusCode).toBe(200);
      expect(response.body.available).toBe(true);
    });
  });
  describe("POST /api/authentication/register", () => {
    it("should return 201, username and user UUID when given valid new user credentials", async () => {
      const response = await request(app)
        .post("/api/authentication/register")
        .send({
          username: "testusername",
          email: "test-user@gmail.com",
          first_name: "Test",
          surname: "User",
        });

      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty("username");
      expect(response.body).toHaveProperty("id");
    });
  });
});
