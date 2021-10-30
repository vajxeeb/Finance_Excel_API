const request = require('supertest')
const app = require('../../server')


const value = {brance_id:2,unit: 80,installment: 21071}
/**
 * GET 
 */
describe("GET/sell value detail/:brance_id/:installment", () => {
    test("return a list of sell value detail", async () => {
      const response = await request(app)
        .get(`/sell-value-detail/${value.brance_id}/${value.installment}`)
      expect(response.statusCode).toBe(200);
    });
});
describe("GET/sell value detail/:brance_id/:unit/:installment", () => {
    test("return a list of sell value detail", async () => {
      const response = await request(app)
        .get(`/sell-value-detail/${value.brance_id}/${value.unit}/${value.installment}`)
      expect(response.statusCode).toBe(200);
    });
});
describe("GET/sell value sum/:brance_id/:installment", () => {
    test("return a list of sell value sum", async () => {
      const response = await request(app)
        .get(`/sell-value-sum/${value.brance_id}/${value.installment}`)
      expect(response.statusCode).toBe(200);
    });
});

describe("GET/sell value sum/:brance_id/:unit/:installment", () => {
    test("return a list of sell value sum", async () => {
      const response = await request(app)
        .get(`/sell-value-sum/${value.brance_id}/${value.unit}/${value.installment}`)
      expect(response.statusCode).toBe(200);
    });
});
