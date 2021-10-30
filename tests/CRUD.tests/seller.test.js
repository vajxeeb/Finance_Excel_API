const request = require('supertest')
const app = require('../../server')

const seller = {seller_name:"xxx",seller_age:22,seller_job:"xxx",
seller_phone:"020xxxxxxxx",seller_address:"xxx xxx xxx", type_of_persent_id: 2}
const seller_update = {seller_id:3,seller_name:"xxx",seller_age:22,seller_job:"xxx",
seller_phone:"020xxxxxxxx",seller_address:"xxx xxx xxx",type_of_persent_id: 2}

const lottery_id = "21809519"
const seller_id = 1
/**
 * POST
 */
describe("POST/Register", () => {
    test("Should be create a new seller", async () => {
      const response = await request(app)
        .post(`/Register/${lottery_id}`)
        .send(seller)
      expect(response.statusCode).toBe(200);
    });

    test("Require seller info", async () => {
      const response = await request(app)
      if(!seller.seller_name || !seller.seller_phone)
      expect(response.statusCode).toBe(400);
    });

});
/**
 * PUT
 */
 describe("PUT/Register", () => {
      test("Should be update new seller", async () => {
        const response = await request(app)
          .put(`/Register`)
          .send(seller_update)
        expect(response.statusCode).toBe(200);
      });
  });
/**
 * DELETE
 */
describe("DELETE/Register/:seller_id 1", () => {
      test("Should be delete the seller", async () => {
        const response = await request(app)
          .put(`/Register/${seller_id}`)
        expect(response.statusCode).toBe(200);
      });
  
      test("Require seller id", async () => {
        const response = await request(app)
        if(!seller_id)
        expect(response.statusCode).toBe(400);
      });

  });
  /**
   * GET
   */
   describe("GET/Register", () => {
    test("should return a list of seller", async () => {
      const response = await request(app)
        .get(`/Register/2`)
      expect(response.statusCode).toBe(200);
    });
});