require("../environment/testing");
const request = require("supertest");
const app = require("../server.js");

describe("Authentication", () => {
  describe("/api/authentication/pk", () => {
    it("should return a valid PEM public key", async () => {
      const response = await request(app).get("/api/authentication/pk");

      expect(response.statusCode).toBe(200);
      expect(response.body).toHaveProperty("public_key");
    });
  });
});
