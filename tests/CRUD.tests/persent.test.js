const request = require('supertest')
const app = require('../../server')



describe("POST/persent", () => {

    test("should be create  persent", async () => {
      const response = await request(app)
        .post("/persent")
        .send({
            type_of_persent_id: 2,
            persent: 20,
            brance_id: 2
        })
      expect(response.statusCode).toBe(200);
    });
    
  });
/**
 * PUT test
 */
describe("PUT/persent", () => {
 
    test("should be update the persent", async () => {
      const response = await request(app)
        .put("/persent")
        .send({
            type_of_persent_id: 2,
            persent: 20,
            brance_id: 2
        })
      expect(response.statusCode).toBe(200);
    });
    
  });
  
/**
 * GET test
 */
  describe("GET/persent", () => {
  
      test("return a list of persent", async () => {
        const response = await request(app)
          .get("/persent")
        expect(response.statusCode).toBe(200);
      });
 
  });