require("../environment/testing");
const request = require("supertest");
const app = require("../server.js");
const db = require("../db");

afterAll(async () => {
  db.end();
});

describe("Authentication", () => {
  describe("/api/authentication/pk", () => {
    it("should return a valid PEM public key", async () => {
      const response = await request(app).get("/api/authentication/pk");

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("public_key");
    });
  });
  describe("GET /api/authentication/exists/username/:username - user exists", () => {
    it("should return 200 when user exists", async () => {
      const response = await request(app).get(
        "/api/authentication/exists/username/zofeeney0"
      );

      expect(response.statusCode).toBe(200);
    });
    it("should return 404 when user does not exist", async () => {
      const response = await request(app).get(
        "/api/authentication/exists/username/404usernotfound"
      );

      expect(response.statusCode).toBe(404);
    });
  });
  describe("GET /api/authentication/exists/email/:email - email exists", () => {
    it("should return 200 when email exists", async () => {
      const response = await request(app).get(
        "/api/authentication/exists/email/zofeeney0@discovery.com"
      );

      expect(response.statusCode).toBe(200);
    });
    it("should return 404 when does not email exist", async () => {
      const response = await request(app).get(
        "/api/authentication/exists/email/404usernotfound@dontexist.com"
      );

      expect(response.statusCode).toBe(404);
    });
  });
});
