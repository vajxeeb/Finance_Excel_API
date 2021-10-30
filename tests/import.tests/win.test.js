const request = require('supertest')
const app = require('../../server')

const win_nout = "23456"

describe("POST/win", () => {

    test("should be crate a new win", async () => {
        const response = await request(app)
            .post(`/win/${win_nout}`)
            .attach('file', '/home/vaxeng/Documents/API/test.xlsx')
        expect(response.statusCode).toBe(200)
    })

    test("if have no a number out", async () => {
        const response = await request(app)
        if (!win_nout)
            expect(response.statusCode).toBe(400)
    })

});
