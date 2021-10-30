const request = require('supertest')
const app = require('../../server')
const own_all = require('../controllers/own.all.controller')

const exitcode = own_all.exitcode;

const value = {brance_id:2,date: "09-2021",unit: 80,installment: 21071}
/**
 * GET test
 */
describe("GET/own-all/:brance_id/:date", () => {
    test("return a list of own-all", async () => {
      const response = await request(app)
        .get(`/own-all/${value.brance_id}/${value.date}`)
      expect(response.statusCode).toBe(200);
    });
    test("error exitcode 1", async () => {
      const response = await request(app)
       if(exitcode==1)
      expect(response.statusCode).toBe(200);
    });

});


describe("GET/own-all/:brance_id/:date/:installment", () => {
    
      test("return a list of own-all", async () => {
        const response = await request(app)
          .get(`/own-all/${value.brance_id}/${value.date}/${value.installment}`)
        expect(response.statusCode).toBe(200);
      });
      test("error exitcode 1", async () => {
        const response = await request(app)
         if(exitcode==1)
        expect(response.statusCode).toBe(200);
      });
  });


  describe("/own-all/:brance_id/:date/:unit", () => {
   
      test("return a list of own-all", async () => {
        const response = await request(app)
          .get(`/own-all/${value.brance_id}/${value.date}/${value.unit}`)
        expect(response.statusCode).toBe(200);
      });
      test("error exitcode 1", async () => {
        const response = await request(app)
         if(exitcode==1)
        expect(response.statusCode).toBe(200);
      });
  });

  
  describe("GET/own-all/:brance_id/:date/:unit/:installment", () => {
    
      test("return a list of own-all", async () => {

        const response = await request(app)
          .get(`/own-all/${value.brance_id}/${value.date}/${value.unit}/${value.installment}`)
        expect(response.statusCode).toBe(200);
      });
      test("error exitcode 1", async () => {
        const response = await request(app)
         if(exitcode==1)
        expect(response.statusCode).toBe(200);
      });
  });