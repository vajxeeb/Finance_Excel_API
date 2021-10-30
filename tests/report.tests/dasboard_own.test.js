const request = require('supertest')
const app = require('../../server')
const value = {brance_id:2,unit: 80,installment: 21071}
/**
 * GET test
 */

describe("GET/dasboard-own-all/:brance_id/:installment", () => {
    
      test("return a list of dasboard-own-all", async () => {
        const response = await request(app)
          .get(`/dasboard-income-all/${value.brance_id}/${value.installment}`)
        expect(response.statusCode).toBe(200);
      });

  });
  describe("GET/dasboard-own-unit/:brance_id/:unit/:installment", () => {
    
    test("return a list of dasboard-own-unit", async () => {
      const response = await request(app)
        .get(`/dasboard-own-unit/${value.brance_id}/${value.unit}/${value.installment}`)
      expect(response.statusCode).toBe(200);
    });

});


  