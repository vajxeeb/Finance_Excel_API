
const request = require('supertest')
const app = require('../../server')


const thork = {lotttery_id: "200938",installment_id: 25,user_id:3, thork_date:"2021-10-04",
thork_by_transfer: 100000,thork_by_cash: 0}
const thork_id = 3
/**
 * POST thork
 */
describe("POST /thork", () => {
  test("should be create a new thork", async () => {
    const response = await request(app)
      .post("/thork")
      .send({
lotttery_id: thork.lotttery_id,
installment_id:thork.installment_id,
user_id: thork.user_id,
thork_date:thork.thork_date,
thork_by_transfer:thork.thork_by_transfer,
thork_by_cash: thork.thork_by_cash
      })
    expect(response.statusCode).toBe(200);
  });
});

/**
 * DELETE
 */
 describe("DELETE /thork", () => {
    test("should be delete the thork", async () => {
      const response = await request(app)
        .delete(`/thork/${thork_id}`)
      expect(response.statusCode).toBe(200);
    });

    test("if have no thork id", async () => {
        const response = await request(app)
        if(!thork_id)
        expect(response.statusCode).toBe(400);
      });
  });

  /**
   * GET
   */
  const value = {brance_id:2,installment: "21072",lotttery_id: "21808000"}

   describe("GET/info-for-thork/:brance_id/:installment/:lottery_id", () => {
    test("return a list of thork", async () => {
      const response = await request(app)
        .get(`/info-for-thork/${value.brance_id}/${value.installment}/${value.lotttery_id}`)
      expect(response.statusCode).toBe(200);
    });
});

describe("GET/info-old-thork/:brance_id/:installment/:lottery_id", () => {
    test("return a list of thork", async () => {
      const response = await request(app)
        .get(`/info-old-thork/${value.brance_id}/${value.installment}/${value.lotttery_id}`)
      expect(response.statusCode).toBe(200);
    });
});

describe("GET/thork/:brance_id", () => {
    test("return a list of thork", async () => {
      const response = await request(app)
        .get(`/thork/${value.brance_id}`)
      expect(response.statusCode).toBe(200);
    });
});
/**
 * POST thork
 */
 describe("PUT /thork", () => {
    test("should be update the thork", async () => {
      const response = await request(app)
        .put(`/thork/${thork.lotttery_id}/${thork.installment_id}`)
        .send({
  thork_by_transfer:thork.thork_by_transfer,
  thork_by_cash: thork.thork_by_cash
  
        })
      expect(response.statusCode).toBe(200);
    });
  });
  