
const request = require('supertest')
const app = require('../../server')


const value = {brance_id:2,unit: 80,installment:21071}
/**
 * GET test
 */
describe("GET//lottery/sell/:brance_id/:installment/:unit", () => {

    test("return a list of lottery", async () => {
      const response = await request(app)
        .get(`/lottery/sell/${value.brance_id}/${value.installment}/${value.unit}`)
      expect(response.statusCode).toBe(200);
    });

});

describe("GET//lottery/sell-all/:brance_id", () => {

    test("return a list of lottery", async () => {
      const response = await request(app)
        .get(`/lottery/sell-all/${value.brance_id}`)
      expect(response.statusCode).toBe(200);
    });

});
