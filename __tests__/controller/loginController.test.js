const {
  describe,
  beforeEach,
  test,
  expect,
  afterEach,
} = require("@jest/globals");
const supertest = require("supertest");
const bcrypt = require("bcrypt");
const path = require("path");

// server root path
const serverPath = path.join(__dirname, "../../src/server");

// app imports
const app = require(serverPath + "/app");

// models
const { User } = require(serverPath + "/models");

// Seed data
async function seedDatabase() {
  const hashedPassword = await bcrypt.hash("password123", 10);
  await User.create({
    name: "Jane Doe",
    email: "jane.doe@test.com",
    password: hashedPassword,
  });
}

async function cleanupDatabase() {
  await User.destroy({
    where: { email: "jane.doe@test.com" },
  });
}

describe("Login Controller", () => {
  beforeEach(async () => {
    await seedDatabase();
  });

  afterEach(async () => {
    await cleanupDatabase();
  });

  test("should successfully login and return JWT", async () => {
    const response = await supertest(app)
      .post("/login")
      .send({
        email: "jane.doe@test.com",
        password: "password123",
      })
      .expect(200);

    expect(response.body).toHaveProperty("message", "Login successful");
    expect(response.body).toHaveProperty("token");
  });

  test("should return 401 for invalid password", async () => {
    const response = await supertest(app)
      .post("/login")
      .send({
        email: "jane.doe@test.com",
        password: "wrongpassword",
      })
      .expect(401);

    expect(response.body).toHaveProperty("message", "Invalid password.");
  });

  test("should return 401 if user does not exist", async () => {
    const response = await supertest(app)
      .post("/login")
      .send({
        email: "nonexistent@test.com",
        password: "password123",
      })
      .expect(401);

    expect(response.body).toHaveProperty(
      "message",
      "The email entered was not found.",
    );
  });
});