
const request = require('supertest')
const app = require('../../server')



const lottery = {
  lottery_id: "1110112", lottery_name: "dddd",
  lottery_printname: "rrr", lottery_refernumber: "345", lottery_status: "ວ່າງ",
  unit_id: 2
}

describe("POST /lottery", () => {
  try{
  test("should be create a new lottery", async () => {
    const response = await request(app)
      .post("/lottery")
      .send({
        lottery_id: lottery.lottery_id,
        lottery_name: lottery.lottery_name,
        lottery_printname: lottery.lottery_printname,
        lottery_refernumber: lottery.lottery_refernumber,
        lottery_status: lottery.lottery_status,
        unit_id: lottery.unit_id
      })
      //.set('Authorization',token)
    expect(response.statusCode).toBe(200);
  });
  }catch(err){
    console.log(err)
  }
});


describe("DELETE /lottery/:id", () => {
  test("should be delete a  lottery", async () => {
    const response = await request(app)
      .put(`/lottery/23434`)
     // .set('Authorization',token)
    expect(response.statusCode).toBe(200);
  });
});

describe("UPDATE /lottery", () => {
  try{
  test("should be update a lottery", async () => {
    const response = await request(app)
      .put("/lottery")
      .send({
        lottery_id: lottery.lottery_id,
        lottery_name: lottery.lottery_name,
        lottery_printname: lottery.lottery_printname,
        lottery_refernumber: lottery.lottery_refernumber,
        lottery_status: lottery.lottery_status,
        unit_id: lottery.unit_id
      })
     // .set('Authorization',token)
    expect(response.statusCode).toBe(200);
  });
}catch(err){
  console.log(err)
}
});
/**
 * GET
 */

describe("GET /lottery", () => {
  test("should return a list of lottery", async () => {
    const response = await request(app)
      .get("/lottery/2")
      //.set('Authorization',token)
    expect(response.statusCode).toBe(200);
  });

});
