
const request = require('supertest')
const app = require('../../server')

describe("GET /Bill", () => {
    test("returns a data to show on the bill", async () => {
      const response = await request(app)
        .get("/bill/2")
      expect(response.statusCode).toBe(200);
    });
  });