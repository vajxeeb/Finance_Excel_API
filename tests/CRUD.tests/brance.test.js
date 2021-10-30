
const request = require('supertest')
const app = require('../../server')

describe("GET /brance", () => {
  test("returns a list of brance", async () => {
    const response = await request(app)
      .get("/brance/2")
    expect(response.statusCode).toBe(200);
  });
});
describe("POST /brance", () => {
  test("should be create a new brance", async () => {
    const response = await request(app)
      .post("/brance")
      .send({
        brance_name: "xxxxx",
        brance_address: "xxxx",
        company_id: 2
      })
    expect(response.statusCode).toBe(200);
  });  
});

describe("DELETE /brance/:id", () => {
  test("should be delete a  brance", async () => {
    const response = await request(app)
      .put(`/brance/8`)
    expect(response.statusCode).toBe(200);
  });
});

describe("UPDATE /brance", () => {
  test("should be update a brance", async () => {
    const response = await request(app)
      .put("/brance")
      .send({
        brance_name: "dddd",
        brance_address: "xxxxxxxxxx",
        brance_id: 6
      })
    expect(response.statusCode).toBe(200);
  });
});