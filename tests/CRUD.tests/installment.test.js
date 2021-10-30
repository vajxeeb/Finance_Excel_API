const request = require('supertest')
const app = require('../../server')

/**
 * GET test
 */
describe("GET/installment", () => {
    test("return a list of installment", async () => {
      const response = await request(app)
        .get("/installment/2")
      expect(response.statusCode).toBe(200);
    });
});