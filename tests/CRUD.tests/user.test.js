
const request = require('supertest')
const app = require('../../server')

const user = { user_name: "xxx", user_phone: "020xxxxxxxx", permision_id: 2, brance_id: 2 }
const user_id = 2;
/**
 * POST USER
 */
describe("POST /user", () => {

  test("should be create a new user", async () => {
    const response = await request(app)
      .post("/user")
      .send({
        user_name: user.user_name,
        user_phone: user.user_phone,
        permision_id: user.permision_id,
        brance_id: user.brance_id
      })
    expect(response.statusCode).toBe(200);
  });

  test("if have no user properties", async () => {
    const response = await request(app)
    if (!user.user_name || !user.user_phone || !user.permision_id || !user.brance_id) {
      expect(response.statusCode).toBe(400);
    }
  });
});
/**
 * PUT USER
 */
describe("PUT /user", () => {

  test("should be UPDATE THE user", async () => {
    const response = await request(app)
      .put("/user")
      .send({
        user_name: user.user_name,
        user_phone: user.user_phone,
        permision_id: user.permision_id,
        brance_id: user.brance_id,
        user_id: 2
      })
    expect(response.statusCode).toBe(200);
  });

  test("if have no user properties", async () => {
    const response = await request(app)
    if (!user.user_name || !user.user_phone || !user.permision_id || !user.brance_id || !user_id) {
      expect(response.statusCode).toBe(400);
    }
  });
});
/**
 * DELETE USER
 */
describe("DELETE/user", () => {
  test("should be DELETE THE user", async () => {
    const response = await request(app)
      .put(`/user/${user_id}`)
    expect(response.statusCode).toBe(200);
  });

  test("sholud not delete the user due to no id", async () => {
    const response = await request(app)
    if (!user_id) {
      expect(response.statusCode).toBe(400);
    }
  });
});

/**
 * GET USER
 */
describe("GET/user/:brance_id", () => {
  test("should return a list of user", async () => {
    const response = await request(app)
      .get(`/user/2`)
    expect(response.statusCode).toBe(200);
  });
});