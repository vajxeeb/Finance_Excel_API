const request = require('supertest')
const app = require('../../server')


const value = {brance_id:2,unit: 80}
/**
 * GET test
 */
describe("GET/lottery/free/:brance_id", () => {

    test("return a list of lottery", async () => {
      const response = await request(app)
        .get(`/lottery/free/${value.brance_id}`)
      expect(response.statusCode).toBe(200);
    });

});
describe("GET/lottery/free/:brance_id/:unit", () => {

    test("return a list of lottery", async () => {
      const response = await request(app)
        .get(`/lottery/free/${value.brance_id}/${value.unit}`)
      expect(response.statusCode).toBe(200);
    });

});
describe("GET/lottery/free-all/:brance_id", () => {

  test("return a list of lottery", async () => {
    const response = await request(app)
      .get(`/lottery/free-all/${value.brance_id}`)
    expect(response.statusCode).toBe(200);
  });

});

  