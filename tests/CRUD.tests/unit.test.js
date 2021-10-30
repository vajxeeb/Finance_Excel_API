
const request = require('supertest')
const app = require('../../server')

const access_token =`eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI3VlFIVzRXLVJQZF8tbjdPZGxUYTJJeWZLbE5jdUkwb1BvdHBKREZfendrIn0.eyJleHAiOjE2MzQ1MjkwNTYsImlhdCI6MTYzNDUyODc1NiwianRpIjoiYWUzMGJjMWYtODAzMy00OWU4LWIxNGEtODljMGY4YzQxZjgxIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL2F1dGgvcmVhbG1zL0RlbW8tUmVhbG0iLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiYzlkZDQ2YjktOGViMi00ZjFlLWI1MWItYTM1ZDZhMGMxNDk2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoibm9kZWpzLW1pY3Jvc2VydmljZSIsInNlc3Npb25fc3RhdGUiOiI5MzA0NDk3NS02NWUyLTQ0NGYtODZmYi1lMTViYThjMDJiMDYiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbImh0dHA6Ly9sb2NhbGhvc3Q6ODAwMCJdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJkZWZhdWx0LXJvbGVzLWRlbW8tcmVhbG0iLCJ1bWFfYXV0aG9yaXphdGlvbiIsImFwcC11c2VyIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsibm9kZWpzLW1pY3Jvc2VydmljZSI6eyJyb2xlcyI6WyJ1c2VyIl19LCJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6InByb2ZpbGUgZW1haWwiLCJzaWQiOiI5MzA0NDk3NS02NWUyLTQ0NGYtODZmYi1lMTViYThjMDJiMDYiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsInByZWZlcnJlZF91c2VybmFtZSI6ImEifQ.e62HUM5jVBwylddl7GrkZX96b_3mfputnMrYFm_lW8yhG944wbqGA5vNjZVRjBgFX88NDHrasHiDwfhwHRMbTyQ-iwAE7AP1uNHAkFsDsvCkL2aw34jpYaqVi4taiprWJgxa1qelQquw1Zx2-9RmrK1DMBPVoJQ8rfnwo1Ya4Su08T2bDECYHMhQE598S0pZOCWmfY_c60C534ezOeZ9bf1MbUYWize1vfpHpmqdZOFOJ_zUtVe-EvKh5WHb7YuNJsyzihdcooNVKHr1-iF7V2c69cmFEsKKnU-jaVbDN2wIMFCwpC0CoE1eBWKpHGxNnJZFQ6s0hOoafiI4jYUe6Q`

describe("POST /unit", () => {
  test("should be create a new unit", async () => {
    const response = await request(app)
      .post("/unit")
      .send({
        unit: "88",
        unit_own: "xxx",
        brance_id: 2
      })
      .set('Authorization',`Bearer ${access_token}`)

    expect(response.statusCode).toBe(200);
  });

  test("should not be create a new unit", async () => {
    const response = await request(app)
      .post("/unit")
      .send({
        unit: "",
        unit_own: "xxx",
        brance_id: 2
      })
      .set('Authorization',`Bearer ${access_token}`)

    expect(response.statusCode).toBe(400);
  });
});

describe("DELETE /unit/:id", () => {
  test("should be delete a  unit", async () => {
    const response = await request(app)
      .put(`/unit/8`)
      .set('Authorization',`Bearer ${access_token}`)

    expect(response.statusCode).toBe(200);
  });
});

describe("PUT /unit", () => {
  test("should be update a unit", async () => {
    const response = await request(app)
      .put("/unit")
      .send({
        unit_id: 2,
        unit: "88",
        unit_own: "xxx",
        brance_id: 2
      })
      .set('Authorization',`Bearer ${access_token}`)

    expect(response.statusCode).toBe(200);
  });
});
describe("GET /unit/:brance id", () => {
  test("returns a list of unit", async () => {
    const response = await request(app)
      .get("/unit/2")
      .set('Authorization',`Bearer ${access_token}`)
    expect(response.statusCode).toBe(200);
  });
});