const request = require('supertest')
const app = require('../../server')


const access_token = `eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI3VlFIVzRXLVJQZF8tbjdPZGxUYTJJeWZLbE5jdUkwb1BvdHBKREZfendrIn0.eyJleHAiOjE2MzQ1MjU5NzgsImlhdCI6MTYzNDUyNTY3OCwianRpIjoiYmY3NjJjOTgtNTMxNC00OWJmLWEzNjgtMzlmNWRlMzIxYWE5IiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL2F1dGgvcmVhbG1zL0RlbW8tUmVhbG0iLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYzlkZDQ2YjktOGViMi00ZjFlLWI1MWItYTM1ZDZhMGMxNDk2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoibm9kZWpzLW1pY3Jvc2VydmljZSIsInNlc3Npb25fc3RhdGUiOiJmODAyNjBjNC1mNmVjLTRkNTItYTkwNS03YjZlNjJmMGFmODgiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHA6Ly9sb2NhbGhvc3Q6ODAwMCJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJkZWZhdWx0LXJvbGVzLWRlbW8tcmVhbG0iLCJ1bWFfYXV0aG9yaXphdGlvbiIsImFwcC11c2VyIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsibm9kZWpzLW1pY3Jvc2VydmljZSI6eyJyb2xlcyI6WyJ1c2VyIl19LCJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6InByb2ZpbGUgZW1haWwiLCJzaWQiOiJmODAyNjBjNC1mNmVjLTRkNTItYTkwNS03YjZlNjJmMGFmODgiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsInByZWZlcnJlZF91c2VybmFtZSI6ImEifQ.KkBzD6ubzBiYmMPCxTD5dJtLtqe1R8sjNStCTb49fQ5SOQZrThoP66P3chqoPFL-ZMgaO0WLkXW5TNjN0NwW8XMI6S_Q9J-gVK1PwPC0i_Yq51gJ7R2iHckN-iGvj9MRSHEFMgHjHa08ySLEF-vtB6UzLiZ7kLdlyV8KYtrjb6H9zkpbVCH9T30DK8wVK-xm5CwgL9MzZW1HZYK-EWSBdjbptcgAajNvaH0CeludX26vpFBj8OQs4M2UZyWf2bEBnPU7GTynHnkTJG72dE0rK0kOjv-pRiHzx72Fl-GPrgPbZPVJM_pADmms9iHGDy6UICePZKeE1SRlrsz96JTXyw`
const cpn = {
    company_id: 2, company_name: "xxx", company_street: "xxx", company_address: "xx xx xx", company_phone: "020xxxxxxxx",
    company_email: "eeeee@gamil.com", company_fax: "xxx"
}

/**
 * POST
 */
describe("POST /company", () => {
    test("should be create a new company", async () => {
        const response = await request(app)
            .post("/company")
            .send({
                company_name: cpn.company_name,
                company_street: cpn.company_street,
                company_address: cpn.company_address,
                company_phone: cpn.company_phone,
                company_email: cpn.company_email,
                company_fax: cpn.company_fax
            })
            .set('Authorization',`Bearer ${access_token}`)
        expect(response.statusCode).toBe(200);
    });
});
/**
 * PUT
 */
describe("UPDATE /company", () => {
    test("should be update a company", async () => {
        const response = await request(app)
            .put("/company")
            .send({
                company_name: cpn.company_name,
                company_street: cpn.company_street,
                company_address: cpn.company_address,
                company_phone: cpn.company_phone,
                company_email: cpn.company_email,
                company_fax: cpn.company_fax,
                company_id: cpn.company_id
            })
        expect(response.statusCode).toBe(200);
    });
});
// /**
//  * GET
//  */
describe("GET /brance", () => {
    test("returns a list of brance", async () => {
      const response = await request(app)
        .get("/company")
      expect(response.statusCode).toBe(200);
    });
  });