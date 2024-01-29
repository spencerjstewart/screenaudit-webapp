const {
  describe,
  beforeAll,
  beforeEach,
  afterAll,
  test,
  expect,
} = require("@jest/globals");

// 3rd party imports
const httpMocks = require("node-mocks-http");
const supertest = require("supertest");
const path = require("path");

// server root path
const serverPath = path.join(__dirname, "../../src/server");

// app imports
const app = require(serverPath + "/app");
const registerController = require(
  serverPath + "/controllers/registerController",
);

// models
const { User } = require(serverPath + "/models");

// seed data
async function seedDatabase() {
  await User.create({
    name: "Existing User",
    email: "existinguser@test.com",
    password: "password123",
  });
}

async function cleanupDatabase() {
  await User.destroy({
    where: { email: "existinguser@test.com" },
  });
}

describe("Register Controller", () => {
  beforeAll(async () => {
    await seedDatabase();
  });

  afterAll(async () => {
    await cleanupDatabase();
  });

  test("should create a new user and redirect to login", async () => {
    const response = await supertest(app)
      .post("/register")
      .send({
        name: "Test User",
        email: "test@test.com",
        password: "password123",
      })
      .expect(302);

    expect(response.headers.location).toBe("/login");

    const createdUser = await User.findOne({
      where: { email: "test@test.com" },
    });
    expect(createdUser).not.toBeNull();
    expect(createdUser.name).toBe("Test User");
    expect(createdUser.email).toBe("test@test.com");

    if (createdUser) {
      await createdUser.destroy();
    }
  });

  test("should respond with 400 status code for invalid input", async () => {
    const response = await supertest(app).post("/register").send({
      name: "Test User", // Missing email and password
    });

    expect(response.statusCode).toBe(400);
  });

  test(
    "should response with a 409 status code when inputting a duplicate" +
      " email address",
    async () => {
      // same as seed data
      const duplicateUserData = {
        name: "New User",
        email: "existinguser@test.com",
        password: "newpassword123",
      };

      const response = await supertest(app)
        .post("/register")
        .send(duplicateUserData);

      expect(response.statusCode).toBe(409);
    },
  );
});