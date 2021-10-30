const request = require('supertest')
const app = require('../../server')

describe("PUT/ lottery/:lottery_id", () => {

  try{
    test("Should be log the lottery out", async () => {
      let lottery_id = "23125"   
      const response = await request(app)
        .put("/lottery/"+lottery_id)
      expect(response.statusCode).toBe(200);
    });

    test("The data empty", async () => {
      const response = await request(app)
      let lottery_id = "23125"
      if(!lottery_id)
      expect(response.statusCode).toBe(400);
    });

  }catch(e){

  }
});