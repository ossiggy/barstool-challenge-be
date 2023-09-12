import chai from "chai";
import mongoose from "mongoose";
import chaiHttp from "chai-http";
import { createMockGameData, mlbData } from "../structures";
import { TEST_DATABASE_URL } from "../../config";
import { app, runServer, closeServer } from "../../index";
import { gameFields, GameStatsSchemaProps } from "../../models";

const assert = chai.assert;

chai.use(chaiHttp);

const tearDownDb = () => {
  return new Promise((resolve, reject) => {
    console.warn("Deleting database");
    mongoose.connection
      .dropDatabase()
      .then((result) => resolve(result))
      .catch((err) => reject(err));
  });
};

describe("gameRoutes", () => {
  let agent = chai.request.agent(app);

  before(() => {
    return runServer(TEST_DATABASE_URL);
  });

  afterEach(() => {
    return tearDownDb();
  });

  after(() => {
    return closeServer();
  });

  it("Should create a game on POST", () => {
    return agent
      .post("/api/game")
      .send(mlbData)
      .then((res) => {
        const hasKeys = gameFields.reduce(
          (acc, x) => acc && res.body.hasOwnProperty(x),
          true
        );
        assert.equal(res.status, 200);
        assert.equal(hasKeys, true);
        return res;
      });
  });

  it("Should send back a game by id", () => {
    return createMockGameData().then((game: any) => {
      return agent.get(`/api/game/${game.body.id}`).then((res) => {
        const hasKeys = gameFields.reduce(
          (acc, x) => acc && res.body.hasOwnProperty(x),
          true
        );
        assert.equal(typeof res.body, "object");
        assert.equal(res.body.id, game.id);
        assert.equal(hasKeys, true);
        return res;
      });
    });
  });

  it("Should update games on PUT", () => {
    return createMockGameData().then((game: any) => {
      const mockPayload = Object.assign({}, mlbData, {
        updatedAt: new Date().toISOString(),
        feedUrl: "bar.com",
        officials: [
          {
            position: "Home",
            first_name: "Agent",
            last_name: "Smith",
          },
        ],
      });
      return agent
        .put(`/api/game/${game.body.id}`)
        .send(mockPayload)
        .then((res) => {
          assert.equal(
            res.body.id,
            game.body.id,
            `first condition: ${res.body.id}, ${game.body.id}`
          );
          assert.equal(
            res.body.feedUrl,
            mockPayload.feedUrl,
            `second condition: ${res.body.feedUrl}, ${mockPayload.feedUrl}`
          );
          assert.equal(
            res.body.officials[0].position,
            mockPayload.officials[0].position,
            `fourth condition: ${res.body.officials[0].position}, ${mockPayload.officials[0].position}`
          );
          assert.equal(
            res.body.officials[0].last_name,
            mockPayload.officials[0].last_name,
            `fifth condition: ${res.body.officials[0].last_name}, ${mockPayload.officials[0].last_name}`
          );
          assert.equal(
            res.body.officials[0].first_name,
            mockPayload.officials[0].first_name,
            `sixth condition: ${res.body.officials[0].first_name}, ${mockPayload.officials[0].first_name}`
          );
          return res;
        });
    });
  });
});
