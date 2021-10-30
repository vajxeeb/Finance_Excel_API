const request = require('supertest')
const app = require('../../server')


const value = {brance_id:2,unit: 80,installment:21071}
/**
 * GET test
 */
describe("GET/num6/:brance_id", () => {
    test("return a list of num6", async () => {
      const response = await request(app)
        .get(`/num6/${value.brance_id}`)
      expect(response.statusCode).toBe(200);
    });

});
