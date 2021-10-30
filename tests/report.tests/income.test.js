const request = require('supertest')
const app = require('../../server')


const value = {brance_id:2,date: "09-2021",unit: 80,installment: 21071}
/**
 * GET test
 */
describe("GET/sum-income/:brance_id/:date", () => {
  try {
    test("return a list of sum-income", async () => {
      const response = await request(app)
        .get(`/sum-income/${value.brance_id}/${value.date}`)
      expect(response.statusCode).toBe(200);
    });
  } catch (error) {
    test("Error", async () => {
      expect(response.statusCode).toBe(500);
    });
  }
});

describe("GET/sum-income/:brance_id/:date/:installment", () => {
    try {
      test("return a list of sum-income", async () => {
        const response = await request(app)
          .get(`/sum-income/${value.brance_id}/${value.date}/${value.installment}`)
        expect(response.statusCode).toBe(200);
      });
    } catch (error) {
      test("Error", async () => {
        expect(response.statusCode).toBe(500);
      });
    }
  });

  describe("GET/sum-income/:brance_id/:date/:unit", () => {
    try {
      test("return a list of sum-income", async () => {
        const response = await request(app)
          .get(`/sum-income/${value.brance_id}/${value.date}/${value.unit}`)
        expect(response.statusCode).toBe(200);
      });
    } catch (error) {
      test("Error", async () => {
        expect(response.statusCode).toBe(500);
      });
    }
  });

  describe("GET/sum-income/:brance_id/:date/:unit/:installment", () => {
    try {
      test("return a list of own-all", async () => {

        const response = await request(app)
          .get(`/sum-income/${value.brance_id}/${value.date}/${value.unit}/${value.installment}`)
        expect(response.statusCode).toBe(200);
      });
    } catch (error) {
      test("Error", async () => {
        expect(response.statusCode).toBe(500);
      });
    }
  });
  describe("GET/income-detail/:brance_id/:date/:installment", () => {
    try {
      test("return a list of own-all", async () => {

        const response = await request(app)
          .get(`/income-detail/${value.brance_id}/${value.date}/${value.installment}`)
        expect(response.statusCode).toBe(200);
      });
    } catch (error) {
      test("Error", async () => {
        expect(response.statusCode).toBe(500);
      });
    }
  });