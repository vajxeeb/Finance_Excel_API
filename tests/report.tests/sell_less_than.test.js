const request = require('supertest')
const app = require('../../server')


const value = {brance_id:2,unit: 80,installment:21071}
/**
 * GET test
 */
describe("GET/sellless/:brance_id/:installment", () => {
    test("return a list of sellless", async () => {
      const response = await request(app)
        .get(`/sellless/${value.brance_id}/${value.installment}`)
      expect(response.statusCode).toBe(200);
    });

});
describe("GET/sellless/:brance_id/:installment/:unit", () => {
    test("return a list of sellless", async () => {
      const response = await request(app)
        .get(`/sellless/${value.brance_id}/${value.installment}/${value.unit}`)
      expect(response.statusCode).toBe(200);
    });

});