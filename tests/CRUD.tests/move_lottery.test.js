const request = require('supertest');
const app = require('../../server')

describe("UPDATE/ lottery/:lottery_id", () => {

  try{
    test("Should be move the lottery", async () => {
      const response = await request(app)
        .put(`/move_lottery`)
        .send({
          unit_id: 2,
          lottery_id: "21809519"
        })
      expect(response.statusCode).toBe(200);
    });

    test("The data empty", async () => {
      const response = await request(app)
      let lottery = {unit_id: 2,lottery_id: "23125"}
      if(!lottery.unit_id || !lottery.lottery_id)
      expect(response.statusCode).toBe(400);
    });

  }catch(error){
    expect(response.statusCode).toBe(500)
  }
  });