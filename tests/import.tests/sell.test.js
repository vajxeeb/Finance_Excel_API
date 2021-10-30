const request = require('supertest')
const app = require('../../server')


describe("POST/sell", () => {
        test("should be crate a new sell", async () => {
            const response = await request(app)
            .post("/sell")
            .attach('file','/home/vaxeng/Documents/API/test.xlsx')
             expect(response.statusCode).toBe(200)
        }) 
});
