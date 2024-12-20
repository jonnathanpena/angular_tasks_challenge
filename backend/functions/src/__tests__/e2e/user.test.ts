import {Express} from "express";
import * as request from "supertest";
import {App} from "../../app"; // Your Express app

/**
 * Acá dejo un ejemplo simple de test 2e2;
 * completarlo lleva un poco más de tiempo
 * que no me alcanzó para la prueba,
 * pero si quería que sepan que se cómo hacerlos.
 */
describe("User Endpoints", () => {
  let app: Express;

  beforeEach(() => {
    const application = new App();
    app = application.getApp();
  });

  it("should return 404 not found", async () => {
    await request(app)
      .get("/user/person@email.com")
      .expect(404);
  });
});
