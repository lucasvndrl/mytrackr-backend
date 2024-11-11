import request from "supertest";
import app, { closeServer } from "..";

describe("CreateAccountController Integration Tests", () => {
  afterAll(async () => {
    await closeServer();
  });

  it("should throw an error if the account doesn't exist", async () => {
    const response = await request(app).get("/account");

    expect(response.status).toBe(404);
    expect(response.body.message).toBeDefined();
  });

  it("should successfully create an account and return 201", async () => {
    const newAccount = {
      account: {
        user_id: "unique_user_id",
        username: "testuser",
        email: "test@example.com",
        created_at: new Date(),
        last_login: new Date(),
        favorite_genres: ["action", "comedy"],
        avatar: "avatar_url",
      },
    };

    const response = await request(app).post("/account").send(newAccount);

    expect(response.status).toBe(201);
  });

  it("should return 400 if required fields are missing", async () => {
    const incompleteAccount = {
      username: "testuser",
    };

    const response = await request(app)
      .post("/account")
      .send(incompleteAccount);

    expect(response.status).toBe(400);
    expect(response.body.message).toBeDefined();
  });

  it("should return 400 if the account already exists", async () => {
    const existingAccount = {
      user_id: "unique_user_id",
      username: "existinguser",
      email: "existing@example.com",
      created_at: new Date(),
      last_login: new Date(),
      favorite_genres: ["drama", "thriller"],
      avatar: "existing_avatar_url",
    };

    await request(app).post("/account").send(existingAccount);

    const response = await request(app).post("/account").send(existingAccount);

    expect(response.status).toBe(400);
    expect(response.body.message).toBeDefined();
  });

  it("should return details to existing account", async () => {
    const response = await request(app).get("/account");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("user_id", "unique_user_id");
    expect(response.body).toHaveProperty("username");
    expect(response.body).toHaveProperty("email");
    expect(response.body).toHaveProperty("favorite_genres");
    expect(response.body).toHaveProperty("avatar");
  });

  it("should return 200 if the account is correctly updated", async () => {
    const response = await request(app)
      .patch("/account")
      .send({
        account: {
          email: "new_email@email.com",
          username: "new_username",
        },
      });

    expect(response.status).toBe(200);
  });

  it("should throw an error if the account is not updated", async () => {
    const response = await request(app).patch("/account").send({});

    expect(response.status).toBe(400);
  });

  it("should return 200 for successful account deletion", async () => {
    const response = await request(app).delete("/account");
    expect(response.status).toBe(200);
  });
});
